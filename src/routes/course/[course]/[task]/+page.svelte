<script lang="ts">
    import { cpp } from "@codemirror/lang-cpp";
    import { page } from "$app/stores";
    import { authentication } from "$lib/stores/authentication";
    import CodeEditor from "$lib/components/CodeEditor.svelte";
    import OutputConsole from "$lib/components/OutputConsole.svelte";
    import TestCaseEditor from "$lib/components/TestCaseEditor.svelte";
    import InputOutputExample from "$lib/components/InputOutputExample.svelte";
    import Hint from "$lib/components/Hint.svelte";

    let examples: { input: string; output: string }[] = [
        { input: "[1,2,3]", output: "[6]" },
        { input: "Hello World", output: "[H,e,l,l,o,,w,o,r,l,d]" },
    ];

    let hints: string[] = [""];

    function addExample() {
        const newExample = { input: "", output: "" };
        examples = [...examples, newExample];
    }

    function addHint() {
        const newHint = "";
        hints = [...hints, newHint];
    }

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
            "Description of the exercise. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
                <div class="pl-2 pr-2 overflow-auto h-[737px]">
                    {#if ($authentication.isAuthenticated && $authentication.user.role === 0) || $authentication.user.role === 1}
                        <p class="mt-2 text-neutral-100 cursor-default">
                            Description
                        </p>
                        <form class="mt-2">
                            <textarea
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
                        {#each examples as example, i}
                            <InputOutputExample bind:example={examples[i]} />
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
                        {#each hints as hint, i}
                            <Hint bind:hint={hints[i]} />
                        {/each}
                        <button
                            on:click={addHint}
                            class="rounded-sm transition duration-200 ease-in-out text-neutral-100
                text-sm font-mono hover:bg-neutral-700 hover:text-white border border-neutral-700 w-full h-[36px] mt-2 mb-2"
                            >Add hint</button
                        >
                    {:else if $authentication.isAuthenticated && $authentication.user.role === 2}
                        <p class="mt-2 text-neutral-100 cursor-default">
                            Description
                        </p>
                        <p class="mt-2 text-neutral-100 cursor-default">
                            {exercise.description}
                        </p>
                        <p
                            class="mt-2 text-neutral-100 cursor-default items-center"
                        >
                            Examples (Input <i
                                class="fa-solid fa-arrow-right"
                            /> Output)
                        </p>
                        {#each examples as example}
                            <div
                                class="mt-2 text-neutral-100 cursor-default grid grid-cols-3"
                            >
                                <p>{example.input}</p>
                                <i class="fa-solid fa-arrow-right" />
                                <p>{example.output}</p>
                            </div>
                        {/each}
                        <p class="mt-2 text-neutral-100 cursor-default">
                            Hints
                        </p>
                        {#each exercise.hints as hint, i}
                            {#if revealedHintIndex >= i}
                                <p class="mt-2 text-neutral-100">{hint}</p>
                            {/if}
                        {/each}
                    {/if}
                </div>
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
                    {#if $authentication.isAuthenticated && $authentication.user.role === 2}
                        Solution
                    {:else if ($authentication.isAuthenticated && $authentication.user.role === 0) || $authentication.user.role === 1}
                        Code Template
                    {/if}
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
            {:else if ($authentication.isAuthenticated && $authentication.user.role === 0) || $authentication.user.role === 1}
                <TestCaseEditor lang={cpp()} />
            {/if}
        </div>
    </div>
</div>
