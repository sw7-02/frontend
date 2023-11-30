<script lang="ts">
    export let hint: string;
</script>

<form class="mt-2">
    <textarea
        bind:value={hint}
        class="text-neutral-100 text-md bg-neutral-700 w-full p-1"
        rows="3"
        placeholder="Hint"
    />
</form>
