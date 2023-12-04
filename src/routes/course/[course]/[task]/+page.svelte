<script lang="ts">
    import { cpp } from "@codemirror/lang-cpp";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { role } from "$lib/stores/authentication";
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

    type _Exercise = {
        exercise_id: number;
        title: string;
        description: string;
        code_template: string;
        programming_language: string;
        points: number;
        hints: string[];
        test_cases: string[];
        examples: { input: string; output: string }[];
    };

    let data: _Exercise;
    let logs: string[] = [];
    let showToast: boolean = false;
    let revealedHintIndex: number = -1;
    let testRunnerResult: boolean = true;
    let isCorrectSolution: boolean = false;

    async function load() {
        return fetch(
            `${import.meta.env.VITE_API_PREFIX}/course/${get(
                courseIdStore
            )}/session/${get(sessionIdStore)}/exercise/${get(taskIdStore)}`,
            {
                method: "GET",
                headers: {
                    auth: get(jwtStore),
                    "Content-Type": "application/json",
                },
            }
        ).then(async (response) => {
            if (response.ok) {
                response.headers.get("auth") &&
                    jwtStore.set(response.headers.get("auth")!);
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

    function updateExercise() {
        showToast = true;
        return fetch(
            `${import.meta.env.VITE_API_PREFIX}/course/${get(
                courseIdStore
            )}/session/${get(sessionIdStore)}/exercise/${get(taskIdStore)}`,
            {
                method: "PUT",
                headers: {
                    auth: get(jwtStore),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        ).then(async (response) => {
            if (response.ok) {
                return;
            } else {
                console.log(await response.text());
                return { error: "Failed to fetch data" };
            }
        });
    }

    function testExercise() {
        if (isCorrectSolution) {
            // Modal asking if the user wants to publish their solution
            // Should redirect to the solutions overview
            goto(`/course/${$page.params.course}`);
        }

        logs = [...logs, "Testing solution..."];
        // fetch to testrunner

        if (testRunnerResult) {
            logs = [...logs, "Insert succesful testrunner result"];
            isCorrectSolution = true;
        } else logs = [...logs, "Insert failed testrunner result"];
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
        style={role.STUDENT === get(userRoleStore)
            ? "height: calc(100vh - 64px);"
            : "height: calc(100vh - 114px);"}
    >
        {#if data}
            <div
                class="bg-neutral-900 mt-4 mb-4 mr-4 w-[700px] overflow-hidden flex flex-col justify-between rounded-md border border-neutral-600"
            >
                <div
                    class="flex justify-between items-center p-2 border-b border-neutral-600"
                >
                    {#if $jwtStore !== "" && $userRoleStore === role.STUDENT}
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
                    {:else if $jwtStore !== "" && ($userRoleStore === role.TEACHER || $userRoleStore === role.TA)}
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
                    {#if $jwtStore !== "" && $userRoleStore === role.STUDENT}
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
                    {:else if $jwtStore !== "" && ($userRoleStore === role.TEACHER || $userRoleStore === role.TA)}
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
                {#if $jwtStore !== "" && $userRoleStore === role.STUDENT}
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
                        {#if $jwtStore !== "" && $userRoleStore === role.STUDENT}
                            <p class="font-bold">Solution</p>
                        {:else if $jwtStore !== "" && ($userRoleStore === role.TEACHER || $userRoleStore === role.TA)}
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
                {#if $jwtStore !== "" && $userRoleStore === role.STUDENT}
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
                            on:click={testExercise}
                            class="rounded-md transition duration-200 ease-in-out text-neutral-100 bg-gray-800
                        text-md font-light hover:bg-gray-700 border border-neutral-600 pl-3 pr-3 pb-1 pt-1 mr-2"
                            >{isCorrectSolution
                                ? "Submit Solution"
                                : "Test Solution"}</button
                        >
                    </div>
                {:else if $jwtStore !== "" && ($userRoleStore === role.TEACHER || $userRoleStore === role.TA)}
                    <TestCaseEditor
                        lang={cpp()}
                        bind:testCases={data.test_cases}
                    />
                {/if}
            </div>
        {/if}
    </div>
    {#if $jwtStore !== "" && ($userRoleStore === role.TEACHER || $userRoleStore === role.TA)}
        <div class="flex justify-end w-[1816px]">
            <SaveExerciseButton {updateExercise} />
        </div>
    {/if}
</div>
<Toast bind:showToast message="Exercise saved" />
