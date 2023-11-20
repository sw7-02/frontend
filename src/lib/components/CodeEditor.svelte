<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { oneDark } from "@codemirror/theme-one-dark";

    let value = "";
</script>

<CodeMirror class="text-neutral-100" bind:value tabSize={4} theme={oneDark} />
