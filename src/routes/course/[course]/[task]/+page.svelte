<script lang="ts">
    import { page } from "$app/stores";
    import { authentication } from "$lib/stores/authentication";
    import CodeEditor from "$lib/components/CodeEditor.svelte";
    import * as marked from "marked";

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
</script>

<title>{$page.params.task}</title>
<div
    class="grid grid-cols-1 justify-items-center overflow-hidden"
    style="height: calc(100vh - 64px);"
>
    <div class="flex overflow-hidden">
        <div class="bg-neutral-900 mt-4 mb-2 mr-4 w-[700px]">
            <div class="flex justify-between items-center">
                {#if ($authentication.isAuthenticated && $authentication.user.role === 0) || $authentication.user.role === 1}
                    <input
                        class="mt-4 ml-4 mr-1 text-neutral-100 text-lg bg-neutral-900 w-full border border-neutral-800"
                        type="text"
                        value={exercise.name}
                    />
                    <div class="flex justify-end">
                        <p
                            class="mt-4 mr-1 text-green-700 text-md cursor-default"
                        >
                            Points:
                        </p>
                        <select
                            class="mt-4 mr-4 text-neutral-100 text-md bg-neutral-900 border border-neutral-800"
                            value={exercise.points}
                        >
                            {#each Array.from({ length: 11 }, (_, i) => i) as option}
                                <option value={option}>{option}</option>
                            {/each}
                        </select>
                    </div>
                {/if}
                {#if $authentication.isAuthenticated && $authentication.user.role === 2}
                    <p
                        class="pt-4 pl-4 pr-4 text-neutral-100 text-lg cursor-default"
                    >
                        {exercise.name}
                    </p>
                    <p
                        class="mt-4 ml-4 mr-4 text-green-700 text-md cursor-default"
                    >
                        Points: {exercise.points}
                    </p>
                {/if}
            </div>
            <p class="p-4 text-neutral-100 cursor-default">
                {@html marked.parse(exercise.description)}
            </p>
        </div>
        <div class="bg-neutral-900 mt-4 mb-2 w-[1100px] overflow-auto">
            <CodeEditor />
        </div>
    </div>
</div>
<div class="border border-black-500 rounded w-[1820px] ml-12 overflow-auto">
    <button class="rounded-sm bg-neutral-700 transition duration-200 ease-in-out text-neutral-950
    hover:text-green-700 hover:bg-neutral-800 text-sm pl-3 pr-3 mr-6 font-mono border border-neutral-700 bg-opacity-50">Hint</button>
    <button class="rounded-sm bg-neutral-700 transition duration-200 ease-in-out text-neutral-950
    hover:text-green-700 hover:bg-neutral-800 text-sm pl-3 pr-3 mr-6 font-mono border border-neutral-700 bg-opacity-50">Test</button>
    <button class="rounded-sm bg-neutral-700 transition duration-200 ease-in-out text-neutral-950
    hover:text-green-700 hover:bg-neutral-800 text-sm pl-3 pr-3 mr-6 font-mono border border-neutral-700 bg-opacity-50">Submit</button>
</div> 