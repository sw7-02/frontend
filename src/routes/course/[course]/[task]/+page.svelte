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

    async function load() {
        return fetch(
            `http://localhost:8080/course/${get(courseIdStore)}/session/${get(
                sessionIdStore
            )}/exercise/${get(taskIdStore)}`,
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

    let revealedHintIndex = -1;

    function updateExercise() {
        console.log(data);
        return fetch(
            `http://localhost:8080/course/${get(courseIdStore)}/session/${get(
                sessionIdStore
            )}/exercise/${get(taskIdStore)}`,
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

    function addHint() {
        const newHint = "";
        data.hints = [...data.hints, newHint];
    }

    function revealHint() {
        if (revealedHintIndex < data.hints.length - 1) {
            revealedHintIndex++;
        }
    }

    function addExample() {
        const newExample = { input: "", output: "" };
        data.examples = [...data.examples, newExample];
    }
</script>

<title>{$page.params.task}</title>
<div
    class="grid grid-cols-1 justify-items-center overflow-hidden"
    style="height: calc(100vh - 64px);"
>
    <div class="flex overflow-hidden">
        {#if data}
            <div class="mt-4 mb-4 mr-4 w-[700px] flex flex-col justify-between">
                <div>
                    <div
                        class="flex justify-between bg-neutral-800 items-center p-2 border-b-[2px] border-neutral-700"
                    >
                        {#if $jwtStore !== "" && $userRoleStore === role.STUDENT}
                            <p class="text-neutral-100 text-md cursor-default">
                                {data.title}
                            </p>
                            <p class="text-green-700 text-md cursor-default">
                                Points: {data.points}
                            </p>
                        {:else if $jwtStore !== "" && ($userRoleStore === role.TEACHER || $userRoleStore === role.TA)}
                            <input
                                class="text-neutral-100 text-md bg-neutral-700 w-full border border-neutral-800 pl-1"
                                type="text"
                                bind:value={data.title}
                            />
                            <div class="flex justify-end">
                                <p
                                    class="ml-2 mr-2 text-green-700 text-md cursor-default"
                                >
                                    Points:
                                </p>
                                <select
                                    class="text-neutral-100 text-md bg-neutral-700 border border-neutral-800"
                                    bind:value={data.points}
                                >
                                    {#each Array.from({ length: 11 }, (_, i) => i) as option}
                                        <option value={option}>{option}</option>
                                    {/each}
                                </select>
                            </div>
                        {/if}
                    </div>
                    <div
                        class="bg-neutral-900 pl-2 pr-2 overflow-auto h-[739px]"
                    >
                        {#if $jwtStore !== "" && $userRoleStore === role.STUDENT}
                            <p
                                class="mt-2 text-neutral-100 cursor-default text-lg"
                            >
                                Description
                            </p>
                            <p class="mt-2 text-neutral-100 cursor-default">
                                {data.description}
                            </p>
                            <p
                                class="mt-4 text-neutral-100 cursor-default items-center text-lg"
                            >
                                Examples (Input <i
                                    class="fa-solid fa-arrow-right"
                                /> Output)
                            </p>
                            {#each data.examples as example}
                                <div
                                    class="mt-2 text-neutral-100 cursor-default grid grid-cols-3"
                                >
                                    <p>{example.input}</p>
                                    <i class="fa-solid fa-arrow-right" />
                                    <p>{example.output}</p>
                                </div>
                            {/each}
                            <p
                                class="mt-4 text-neutral-100 cursor-default text-lg"
                            >
                                Hints
                            </p>
                            {#each data.hints as hint, i}
                                {#if revealedHintIndex >= i}
                                    <p class="mt-2 text-neutral-100">{hint}</p>
                                {/if}
                            {/each}
                        {:else if $jwtStore !== "" && ($userRoleStore === role.TEACHER || $userRoleStore === role.TA)}
                            <p class="mt-2 text-neutral-100 cursor-default">
                                Description
                            </p>
                            <form class="mt-2">
                                <textarea
                                    bind:value={data.description}
                                    class="text-neutral-100 text-md bg-neutral-700 w-full p-1"
                                    rows="10"
                                />
                            </form>
                            <p
                                class="mt-2 text-neutral-100 cursor-default items-center"
                            >
                                Examples (Input <i
                                    class="fa-solid fa-arrow-right"
                                /> Output)
                            </p>
                            {#each data.examples as example, i}
                                <InputOutputExample
                                    bind:example={data.examples[i]}
                                />
                            {/each}
                            <button
                                on:click={addExample}
                                class="rounded-sm transition duration-200 ease-in-out text-neutral-100
                    text-sm font-mono hover:bg-neutral-700 hover:text-white border border-neutral-700 w-full h-[36px] mt-2"
                                >Add example</button
                            >
                            <p class="mt-2 text-neutral-100 cursor-default">
                                Hints
                            </p>
                            {#each data.hints as hint, i}
                                <Hint bind:hint={data.hints[i]} />
                            {/each}
                            <button
                                on:click={addHint}
                                class="rounded-sm transition duration-200 ease-in-out text-neutral-100
                text-sm font-mono hover:bg-neutral-700 hover:text-white border border-neutral-700 w-full h-[36px] mt-2 mb-2"
                                >Add hint</button
                            >
                        {/if}
                    </div>
                </div>
                {#if $jwtStore !== "" && $userRoleStore === role.STUDENT}
                    <div
                        class="bg-neutral-900 flex justify-end p-2 h-[54px] border-t-[2px] border-neutral-700"
                    >
                        <button
                            on:click={revealHint}
                            class="rounded-sm transition duration-200 ease-in-out text-neutral-100
                    text-sm font-mono hover:bg-neutral-700 hover:text-white border border-neutral-700 w-[80px] h-[36px]"
                            >Hint</button
                        >
                    </div>
                {:else if $jwtStore !== "" && ($userRoleStore === role.TEACHER || $userRoleStore === role.TA)}
                    <div class="flex justify-end p-2 h-[54px]" />
                {/if}
            </div>
            <div class="mt-4 mb-4 w-[1100px] overflow-hidden flex flex-col">
                <div>
                    <p
                        class="bg-neutral-800 text-neutral-100 p-2 border-b-[2px] border-neutral-700 justify-between flex"
                    >
                        {#if $jwtStore !== "" && $userRoleStore === role.STUDENT}
                            <p>Solution</p>
                        {:else if $jwtStore !== "" && ($userRoleStore === role.TEACHER || $userRoleStore === role.TA)}
                            <p>Code Template</p>
                            <div class="flex items-center">
                                <p class="pr-1">Language:</p>
                                <select
                                    class="bg-neutral-700"
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
                    <div>
                        <p
                            class="bg-neutral-800 text-neutral-100 p-2 border-b-[2px] border-t-[2px] border-neutral-700"
                        >
                            Output
                        </p>
                        <OutputConsole />
                    </div>
                    <div
                        class="bg-neutral-900 flex justify-end p-2 h-[54px] border-t-[2px] border-neutral-700"
                    >
                        <button
                            class="rounded-sm transition duration-200 ease-in-out text-neutral-100
                    text-sm mr-4 font-mono hover:bg-neutral-700 hover:text-white border border-neutral-700 w-[80px] h-[36px]"
                            >Test</button
                        >
                        <button
                            class="rounded-sm transition duration-200 ease-in-out text-neutral-100
             text-sm pl-3 pr-3 font-mono hover:bg-neutral-700 hover:text-white border border-neutral-700 w-[80px] h-[36px]"
                            >Submit</button
                        >
                    </div>
                {:else if $jwtStore !== "" && ($userRoleStore === role.TEACHER || $userRoleStore === role.TA)}
                    <TestCaseEditor
                        lang={cpp()}
                        bind:testCases={data.test_cases}
                    />
                    <SaveExerciseButton {updateExercise} />
                {/if}
            </div>
        {/if}
    </div>
</div>
