<script lang="ts">
    import DeleteButton from "./DeleteButton.svelte";

    export let example: { input: string; output: string };
    export let deleteExample: () => void;
</script>

<div class="flex items-center mt-2">
    <input
        bind:value={example.input}
        class="bg-neutral-700 w-full text-neutral-100 mr-2 p-1 border border-neutral-600 rounded-md"
        type="text"
        placeholder="Input"
    />
    <p class="text-neutral-100">
        <i class="fa-solid fa-arrow-right-long text-sm" />
    </p>
    <input
        bind:value={example.output}
        class="bg-neutral-700 w-full text-neutral-100 ml-2 p-1 border border-neutral-600 rounded-md"
        type="text"
        placeholder="Output"
    />
    <div class="ml-2">
        <DeleteButton onClick={deleteExample} />
    </div>
</div>
