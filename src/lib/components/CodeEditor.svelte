<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { oneDark } from "@codemirror/theme-one-dark";
    import * as marked from "marked";

    export let lang: any;
    export let value: string = "";
</script>

<CodeMirror
    class="bg-neutral-900 text-neutral-100 w-full h-[400px] overflow-auto"
    bind:value
    tabSize={4}
    theme={oneDark}
    {lang}
    on:change={() => {
        console.log(marked.parse(value));
    }}
/>
