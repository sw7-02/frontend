<script lang="ts">
    import { cpp } from "@codemirror/lang-cpp";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { Role } from "$lib/types";
    import type { _Exercise } from "$lib/types";
    import { jwtStore, userRoleStore } from "$lib/stores/authentication";
    import {
        courseIdStore,
        sessionIdStore,
        taskIdStore,
    } from "$lib/stores/ids";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";
    import Toast from "$lib/components/Toast.svelte";
    import CodeEditor from "$lib/components/CodeEditor.svelte";
    import OutputConsole from "$lib/components/OutputConsole.svelte";
    import TestCaseEditor from "$lib/components/TestCaseEditor.svelte";
    import SaveExerciseButton from "$lib/components/SaveExerciseButton.svelte";
    import InputOutputExample from "$lib/components/InputOutputExample.svelte";
    import Hint from "$lib/components/Hint.svelte";
    import { generateGet, generatePost, generatePut } from "$lib/fetchers";

    let data: _Exercise;
    let logs: string[] = [];
    let showToast: boolean = false;
    let revealedHintIndex: number = -1;
    let isCorrectSolution: boolean = false;

    async function load() {
        return generateGet(
            `/course/${get(courseIdStore)}/session/${get(
                sessionIdStore
            )}/exercise/${get(taskIdStore)}`
        ).then(async (response) => {
            if (response.ok) {
                return response
                    .json()
                    .then((data) => {
                        return data;
                    })
                    .catch((error) => {
                        console.log(error);
                        return { error: "Failed to parse data" };
                    });
            } else {
                console.log(await response.text());
                return { error: "Failed to fetch data" };
            }
        });
    }

    onMount(async () => {
        data = await load();
        data.programming_language = "C";
    });

    async function updateExercise() {
        showToast = true;
        let response = await generatePut(
            `/course/${get(courseIdStore)}/session/${get(
                sessionIdStore
            )}/exercise/${get(taskIdStore)}`,
            data
        );
        if (response.ok) {
            return;
        } else {
            console.log(await response.text());
            return { error: "Failed to fetch data" };
        }
    }

    async function testExercise() {
        logs = [...logs, "Testing solution..."];
        //logs.push("Testing solution...");
        await generatePost(
            `course/${get(courseIdStore)}/session/${get(
                sessionIdStore
            )}/exercise/${get(taskIdStore)}/test`,
            { solution: data.code_template }
        ).then(
            async (response) => {
                if (response.ok) {
                    logs = [...logs, "Solution passed all tests"];
                    isCorrectSolution = true;
                } else {
                    await response.json().then(
                        (json) => {
                            const { count, failed_tests } = json;
                            if (
                                count === undefined ||
                                failed_tests === undefined
                            ) {
                                logs = [...logs, `Failure from test runner`];
                                console.error(`wrong response data: ${json}`);
                            } else {
                                logs = [
                                    ...logs,
                                    `Solution failed ${count} tests:`,
                                ];
                                for (const test of failed_tests) {
                                    console.error(test);
                                    logs = [...logs, `=> ${test}`];
                                }
                            }
                        },
                        (e) => console.error(e)
                    );
                    return { error: "Failed to fetch data" };
                }
            },
            (err) => {
                logs = [...logs, `Failed running tests: ${err}`];
            }
        );
    }

    async function submitExercise() {
        await generatePost(
            `course/${get(courseIdStore)}/session/${get(
                sessionIdStore
            )}/exercise/${get(taskIdStore)}`,
            { solution: data.code_template }
        ).then(
            async (response) => {
                if (response.ok) {
                    logs = [...logs, "Solution has been submitted"];
                    setTimeout(
                        async () => await goto(`${$page.url}/Solutions`),
                        1500
                    ); //TODO: Artificial delay?
                } else {
                    isCorrectSolution = false;
                    logs = [...logs, "Solution failed to be submitted"];
                    await response.json().then(
                        (json) => {
                            const { count, failed_tests } = json;
                            if (
                                count === undefined ||
                                failed_tests === undefined
                            ) {
                                logs = [...logs, `> ${json}`];
                            } else {
                                logs = [
                                    ...logs,
                                    `Solution failed ${count} tests:`,
                                ];
                                for (const test of failed_tests) {
                                    console.error(test);
                                    logs = [...logs, `=> ${test}`];
                                }
                            }
                        },
                        (e) => {
                            isCorrectSolution = false;
                            console.error(e);
                        }
                    );
                    return { error: "Failed to fetch data" };
                }
            },
            (err) => {
                isCorrectSolution = false;
                logs = [...logs, `Failed submitting: ${err}`];
            }
        );
    }

    function revealHint() {
        if (revealedHintIndex < data.hints.length - 1) {
            revealedHintIndex++;
        }
    }

    function addHint() {
        const newHint = "";
        data.hints = [...data.hints, newHint];
    }

    function deleteHint(i: number) {
        if (data.hints.length > 0) {
            data.hints = [
                ...data.hints.slice(0, i),
                ...data.hints.slice(i + 1),
            ];
        }
    }

    function addExample() {
        const newExample = { input: "", output: "" };
        data.examples = [...data.examples, newExample];
    }

    function deleteExample(i: number) {
        if (data.examples.length > 0) {
            data.examples = [
                ...data.examples.slice(0, i),
                ...data.examples.slice(i + 1),
            ];
        }
    }
</script>

<title>{$page.params.task}</title>
<div class="grid grid-cols-1 justify-items-center overflow-hidden">
    <div
        class="flex overflow-hidden"
        style={Role.STUDENT === get(userRoleStore)
            ? "height: 867px;"
            : "height: 817px;"}
    >
        {#if data}
            <div
                class="bg-neutral-900 mt-4 mb-4 mr-4 w-[700px] overflow-hidden flex flex-col justify-between rounded-md border border-neutral-600"
            >
                <div
                    class="flex justify-between items-center p-2 border-b border-neutral-600"
                >
                    {#if $jwtStore !== "" && $userRoleStore === Role.STUDENT}
                        <p
                            class="text-neutral-100 text-md cursor-default font-bold"
                        >
                            {data.title}
                        </p>
                        <p
                            class="text-md cursor-default text-cyan-800 font-bold"
                        >
                            Points: {data.points}
                        </p>
                    {:else if $jwtStore !== "" && ($userRoleStore === Role.TEACHER || $userRoleStore === Role.TA)}
                        <input
                            class="pl-1 w-full text-neutral-100 text-md bg-neutral-700 border border-neutral-600 rounded-md font-bold"
                            type="text"
                            bind:value={data.title}
                        />
                        <div class="flex justify-end">
                            <p
                                class="ml-2 mr-2 text-md cursor-default text-neutral-100 font-bold"
                            >
                                Points:
                            </p>
                            <select
                                class="text-neutral-100 text-md bg-gray-800 border border-neutral-600 rounded-md font-bold"
                                bind:value={data.points}
                            >
                                {#each Array.from({ length: 11 }, (_, i) => i) as option}
                                    <option value={option}>{option}</option>
                                {/each}
                            </select>
                        </div>
                    {/if}
                </div>
                <div class="pl-2 pr-2 overflow-y-auto h-full">
                    {#if $jwtStore !== "" && $userRoleStore === Role.STUDENT}
                        <p class="mt-2 text-neutral-100 cursor-default">
                            {data.description}
                        </p>
                        {#if data.examples.length > 0}
                            <p
                                class="mt-4 text-neutral-100 cursor-default items-center text-md font-bold"
                            >
                                Example(s) (Input <i
                                    class="fa-solid fa-arrow-right-long text-sm"
                                /> Output)
                            </p>
                        {/if}
                        {#each data.examples as example}
                            <div
                                class="mt-2 text-neutral-100 cursor-default flex items-center"
                            >
                                <i
                                    class="fa-solid fa-circle text-[5px] text-cyan-800 mr-2 border border-neutral-600 rounded-full"
                                />
                                <p>
                                    {example.input}
                                </p>
                                <i
                                    class="fa-solid fa-arrow-right-long text-sm ml-2 mr-2"
                                />
                                <p>{example.output}</p>
                            </div>
                        {/each}
                        {#if revealedHintIndex >= 0}
                            <p
                                class="mt-4 text-neutral-100 cursor-default text-md font-bold"
                            >
                                Hint(s)
                            </p>
                        {/if}
                        {#each data.hints as hint, i}
                            {#if revealedHintIndex >= i}
                                <div
                                    class="mt-2 text-neutral-100 cursor-default flex items-center"
                                >
                                    <i
                                        class="fa-solid fa-circle text-[5px] text-cyan-800 mr-2 border border-neutral-600 rounded-full"
                                    />
                                    <p>{hint}</p>
                                </div>
                            {/if}
                        {/each}
                    {:else if $jwtStore !== "" && ($userRoleStore === Role.TEACHER || $userRoleStore === Role.TA)}
                        <p
                            class="mt-2 text-neutral-100 cursor-default font-bold"
                        >
                            Description
                        </p>
                        <form class="mt-2">
                            <textarea
                                bind:value={data.description}
                                class="text-neutral-100 text-md bg-neutral-700 w-full p-1 border border-neutral-600 rounded-md"
                                rows="10"
                                placeholder="Write a description for the exercise"
                            />
                        </form>
                        <p
                            class="mt-2 text-neutral-100 cursor-default items-center font-bold"
                        >
                            Example(s) (Input <i
                                class="fa-solid fa-arrow-right-long text-sm"
                            /> Output)
                        </p>
                        {#each data.examples as example, i}
                            <InputOutputExample
                                deleteExample={() => deleteExample(i)}
                                bind:example
                            />
                        {/each}
                        <button
                            on:click={addExample}
                            class="transition duration-200 ease-in-out text-neutral-100 text-md font-light hover:bg-gray-700 border
                            border-neutral-600 rounded-md w-full mt-2 bg-gray-800 pl-3 pr-3 pb-1 pt-1"
                            >Add Example</button
                        >
                        <p
                            class="mt-2 text-neutral-100 cursor-default font-bold"
                        >
                            Hint(s)
                        </p>
                        {#each data.hints as hint, i}
                            <Hint deleteHint={() => deleteHint(i)} bind:hint />
                        {/each}
                        <button
                            on:click={addHint}
                            class="transition duration-200 ease-in-out text-neutral-100 text-md font-light hover:bg-gray-700 border
                            border-neutral-600 rounded-md w-full mt-2 mb-2 bg-gray-800 pl-3 pr-3 pb-1 pt-1"
                            >Add Hint</button
                        >
                    {/if}
                </div>
                {#if $jwtStore !== "" && $userRoleStore === Role.STUDENT}
                    <div
                        class="flex justify-end p-2 border-t border-neutral-600"
                    >
                        <button
                            on:click={revealHint}
                            class="rounded-md transition duration-200 ease-in-out text-neutral-100 bg-gray-800
                    text-md font-light hover:bg-gray-700 border border-neutral-600 pl-3 pr-3 pb-1 pt-1"
                            >Hint</button
                        >
                    </div>
                {/if}
            </div>
            <div
                class="mt-4 mb-4 w-[1100px] flex flex-col overflow-hidden rounded-md border border-neutral-600 bg-neutral-900"
            >
                <div>
                    <p
                        class="text-neutral-100 p-2 border-b-[1px] border-neutral-700 justify-between flex"
                    >
                        {#if $jwtStore !== "" && $userRoleStore === Role.STUDENT}
                            <p class="font-bold">Solution</p>
                        {:else if $jwtStore !== "" && ($userRoleStore === Role.TEACHER || $userRoleStore === Role.TA)}
                            <p class="font-bold">Code Template</p>
                            <div class="flex items-center">
                                <p class="pr-2 font-bold">Language:</p>
                                <select
                                    class="bg-gray-800 rounded-md border border-neutral-600"
                                    bind:value={data.programming_language}
                                >
                                    <option value="C">C</option>
                                </select>
                            </div>
                        {/if}
                    </p>
                    <CodeEditor lang={cpp()} bind:value={data.code_template} />
                </div>
                {#if $jwtStore !== "" && $userRoleStore === Role.STUDENT}
                    <p
                        class="text-neutral-100 p-2 border-b border-t border-neutral-600 font-bold"
                    >
                        Output
                    </p>
                    <OutputConsole {logs} />

                    <div
                        class="flex justify-end p-2 border-t border-neutral-600"
                    >
                        <button
                            on:click={isCorrectSolution
                                ? submitExercise
                                : testExercise}
                            class="rounded-md transition duration-200 ease-in-out text-neutral-100 bg-gray-800
                        text-md font-light hover:bg-gray-700 border border-neutral-600 pl-3 pr-3 pb-1 pt-1 mr-2"
                            >{isCorrectSolution
                                ? "Submit Solution"
                                : "Test Solution"}</button
                        >
                    </div>
                {:else if $jwtStore !== "" && ($userRoleStore === Role.TEACHER || $userRoleStore === Role.TA)}
                    <TestCaseEditor
                        lang={cpp()}
                        bind:testCases={data.test_cases}
                    />
                {/if}
            </div>
        {/if}
    </div>
    {#if $jwtStore !== "" && ($userRoleStore === Role.TEACHER || $userRoleStore === Role.TA)}
        <div class="flex justify-end w-[1816px]">
            <SaveExerciseButton {updateExercise} />
        </div>
    {/if}
</div>
<Toast bind:showToast message="Exercise saved" />
