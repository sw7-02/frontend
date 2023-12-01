<script lang="ts">
    import DeleteButton from "./DeleteButton.svelte";

    export let hint: string;
    export let deleteHint: () => void;
</script>

<div class="flex items-center">
    <form class="mt-2 w-full">
        <textarea
            bind:value={hint}
            class="text-neutral-100 text-md bg-neutral-700 w-full p-1 rounded-md border border-neutral-600"
            rows="3"
            placeholder="Hint"
        />
    </form>
    <div class="ml-2">
        <DeleteButton onClick={deleteHint} />
    </div>
</div>
