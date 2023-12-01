<script lang="ts">
    export let hint: string;
    export let deleteHint: () => void;
</script>

<div class="flex items-center">
    <form class="mt-2 w-full">
        <textarea
            bind:value={hint}
            class="text-neutral-100 text-md bg-neutral-700 w-full p-1"
            rows="3"
            placeholder="Hint"
        />
    </form>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        on:click={deleteHint}
        on:click|stopPropagation
        class="hover:text-red-700 rounded-full text-neutral-100"
    >
        <i class="fa-regular fa-circle-xmark pl-1 pr-1" />
    </div>
</div>
