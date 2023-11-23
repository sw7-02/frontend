<script lang="ts">
    import * as marked from "marked";
    import { cpp } from "@codemirror/lang-cpp";
    import { page } from "$app/stores";
    import { authentication } from "$lib/stores/authentication";
    import CodeEditor from "$lib/components/CodeEditor.svelte";
    import OutputConsole from "$lib/components/OutputConsole.svelte";
    import InputOutputExample from "$lib/components/InputOutputExample.svelte";

    //  TODO: Replace this with a fetch request to the API
    let exercise: {
        name: string;
        description: string;
        language: string;
        points: number;
        hints: string[];
    } = {
        name: "Exercise 1: Hello World",
        description:
            "Description <br> Description of the exercise  <br> Examples (Input -> Output) <br> ```Hello World```",
        language: "C",
        points: 3,
        hints: ["Hint 1", "Hint 2", "Hint 3"],
    };

    let revealedHintIndex = -1;

    function revealHint() {
        if (revealedHintIndex < exercise.hints.length - 1) {
            revealedHintIndex++;
        }
    }

    function addExample() {
        console.log("add example");
    }
</script>

<title>{$page.params.task}</title>
<div
    class="grid grid-cols-1 justify-items-center overflow-hidden"
    style="height: calc(100vh - 64px);"
>
    <div class="flex overflow-hidden">
        <div
            class="bg-neutral-900 mt-4 mb-4 mr-4 w-[700px] flex flex-col justify-between"
        >
            <div>
                <div
                    class="flex justify-between bg-neutral-800 items-center p-2 border-b-[2px] border-neutral-700"
                >
                    {#if ($authentication.isAuthenticated && $authentication.user.role === 0) || $authentication.user.role === 1}
                        <input
                            class="text-neutral-100 text-md bg-neutral-700 w-full border border-neutral-800"
                            type="text"
                            value={exercise.name}
                        />
                        <div class="flex justify-end">
                            <p
                                class="ml-2 mr-2 text-green-700 text-md cursor-default"
                            >
                                Points:
                            </p>
                            <select
                                class="text-neutral-100 text-md bg-neutral-700 border border-neutral-800"
                                value={exercise.points}
                            >
                                {#each Array.from({ length: 11 }, (_, i) => i) as option}
                                    <option value={option}>{option}</option>
                                {/each}
                            </select>
                        </div>
                    {:else if $authentication.isAuthenticated && $authentication.user.role === 2}
                        <p class="text-neutral-100 text-md cursor-default">
                            {exercise.name}
                        </p>
                        <p class="text-green-700 text-md cursor-default">
                            Points: {exercise.points}
                        </p>
                    {/if}
                </div>
                {#if ($authentication.isAuthenticated && $authentication.user.role === 0) || $authentication.user.role === 1}
                    <p class="pt-2 pl-2 pr-2 text-neutral-100 cursor-default">
                        Description
                    </p>
                    <form class="pt-2 pl-2 pr-2">
                        <textarea
                            class="text-neutral-100 text-md bg-neutral-700 w-full p-1"
                            rows="10"
                        />
                    </form>
                    <p class="p-2 text-neutral-100 cursor-default items-center">
                        Examples (Input <i class="fa-solid fa-arrow-right" /> Output)
                    </p>
                    <InputOutputExample />
                    <button
                        on:click={addExample}
                        class="rounded-sm transition duration-200 ease-in-out text-neutral-100
                    text-sm font-mono hover:bg-neutral-700 hover:text-white border border-neutral-700 w-full h-[36px] m-2"
                        >Add example</button
                    >
                    <p class="p-2 text-neutral-100 cursor-default">Hints</p>
                {:else if $authentication.isAuthenticated && $authentication.user.role === 2}
                    <p class="p-2 text-neutral-100 cursor-default">
                        {exercise.description}
                    </p>
                {/if}
                {#each exercise.hints as hint, i}
                    {#if revealedHintIndex >= i}
                        <p class="p-2 text-neutral-100">{hint}</p>
                    {/if}
                {/each}
            </div>
            <div
                class="flex justify-end p-2 h-[54px] border-t-[2px] border-neutral-700"
            >
                {#if $authentication.isAuthenticated && $authentication.user.role === 2}
                    <button
                        on:click={revealHint}
                        class="rounded-sm transition duration-200 ease-in-out text-neutral-100
                    text-sm font-mono hover:bg-neutral-700 hover:text-white border border-neutral-700 w-[80px] h-[36px]"
                        >Hint</button
                    >
                {/if}
            </div>
        </div>
        <div
            class="bg-neutral-900 mt-4 mb-4 w-[1100px] overflow-hidden flex flex-col"
        >
            <div>
                <p
                    class="bg-neutral-800 text-neutral-100 p-2 border-b-[2px] border-neutral-700"
                >
                    Solution
                </p>
                <CodeEditor lang={cpp()} />
            </div>
            {#if $authentication.isAuthenticated && $authentication.user.role === 2}
                <div>
                    <p
                        class="bg-neutral-800 text-neutral-100 p-2 border-b-[2px] border-t-[2px] border-neutral-700"
                    >
                        Output
                    </p>
                    <OutputConsole />
                </div>
                <div
                    class="flex justify-end p-2 h-[54px] border-t-[2px] border-neutral-700"
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
            {/if}
        </div>
    </div>
</div>
