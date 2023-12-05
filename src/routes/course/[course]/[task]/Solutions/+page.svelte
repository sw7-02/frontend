<script lang="ts">
    import { page } from "$app/stores";
    import { oneDark } from "@codemirror/theme-one-dark";
    import { cpp } from "@codemirror/lang-cpp";
    import CodeMirror from "svelte-codemirror-editor";
    import { generateGet } from "$lib/fetchers";
    import type { _ExerciseSolution } from "$lib/types";
    import {
        courseIdStore,
        sessionIdStore,
        taskIdStore,
    } from "$lib/stores/ids";
    import { get } from "svelte/store";
    import { onMount } from "svelte";

    //TODO: pinned?
    let data: _ExerciseSolution[] = [];

    async function load() {
        return generateGet(
            `/course/${get(courseIdStore)}/session/${get(
                sessionIdStore
            )}/exercise/${get(taskIdStore)}/solutions`
        ).then(
            async (response) => {
                if (response.ok) return response.json();
                else console.log(await response.text());
            },
            (err) => console.log(err)
        );
    }

    onMount(async () => {
        data = await load();
    });
</script>

<title>Solution Overview - {$page.params.task}</title>
<div
    class="grid grid-cols-1 justify-items-center overflow-hidden"
    style="height: calc(100vh - 64px);"
>
    <div
        class="bg-neutral-900 mt-4 mb-4 p-4 w-[900px] overflow-y-auto rounded-md border border-neutral-600"
    >
        {#if data}
            {#each data as data}
                <div
                    class="rounded-md border border-neutral-600 w-full h-[100px] mb-4 overflow-y-auto"
                >
                    <CodeMirror
                        class="bg-neutral-900 text-neutral-100 w-full overflow-auto"
                        value={data.solution}
                        tabSize={4}
                        theme={oneDark}
                        lang={cpp()}
                    />
                </div>
            {/each}
        {/if}
    </div>
</div>
