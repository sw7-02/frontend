<script lang="ts">
    import { oneDark } from "@codemirror/theme-one-dark";
    import CodeMirror from "svelte-codemirror-editor";

    export let lang: any;
    export let value: string = "";
</script>

<CodeMirror
    class="bg-neutral-900 text-neutral-100 w-full h-[400px] overflow-auto"
    bind:value
    tabSize={4}
    theme={oneDark}
    {lang}
/>
