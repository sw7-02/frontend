<script lang="ts">
    import { page } from "$app/stores";
    import { oneDark } from "@codemirror/theme-one-dark";
    import { cpp } from "@codemirror/lang-cpp";
    import CodeMirror from "svelte-codemirror-editor";

    export let lang: any;

    let data: { solution: string }[] = [
        { solution: "First solution" },
        { solution: "Second solution" },
        { solution: "Third solution" },
        { solution: "Fourth solution"},
        { solution: "Fifth solution"},
        { solution: "First solution" },
        { solution: "Second solution" },
        { solution: "Third solution" },
        { solution: "Fourth solution"},
        { solution: "Fifth solution"},
    ];
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
