<script lang="ts">
    import { page } from "$app/stores";
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
        description: "Description <br> Description of the exercise  <br> Examples (Input -> Output) <br> ```Hello World```",
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
        <div class="bg-neutral-900 mt-4 mb-4 mr-4 w-[700px]">
            <div class="flex justify-between">
                <p
                    class="pt-4 pl-4 pr-4 text-neutral-100 font-mono text-lg cursor-default"
                >
                    {exercise.name}
                </p>
                <p
                    class="pt-4 pl-4 pr-4 text-green-700 text-md font-mono cursor-default"
                >
                    Points: {exercise.points}
                </p>
            </div>
            <p class="p-4 text-neutral-100 cursor-default">
                {@html marked.parse(exercise.description)}
            </p>
        </div>
        <div class="bg-neutral-900 mt-4 mb-4 w-[1100px] overflow-auto">
            <CodeEditor />
        </div>
    </div>
</div>
