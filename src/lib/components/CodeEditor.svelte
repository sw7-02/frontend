<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { oneDark } from "@codemirror/theme-one-dark";
    import { cpp } from "@codemirror/lang-cpp";
    import * as marked from "marked";

    let value = "";
</script>

<CodeMirror
    class="text-neutral-100"
    bind:value
    tabSize={4}
    theme={oneDark}
    lang={cpp()}

    on:change={() => {
        console.log(marked.parse(value));
    }}
/>
