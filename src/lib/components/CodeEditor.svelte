<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";

    let value = "";
</script>

<CodeMirror class="text-neutral-100" bind:value />