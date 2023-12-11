<script lang="ts">
    import { onMount, afterUpdate } from "svelte";

    export let logs: string[];

    let consoleElement: HTMLDivElement;

    onMount(() => {
        scrollToBottom();
    });

    afterUpdate(() => {
        scrollToBottom();
    });

    function scrollToBottom() {
        consoleElement.scrollTop = consoleElement.scrollHeight;
    }
</script>

<div class="h-[300px] overflow-auto" bind:this={consoleElement}>
    {#if logs}
        {#each logs as log}
            <p class="text-neutral-100 pl-2 pr-2">$ {log}</p>
        {/each}
    {/if}
</div>
