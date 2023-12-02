<script lang="ts">
    import { onMount } from "svelte";

    let logs: string[] = [
        "log message 1",
        "log message 2",
        "log message 3",
        "log message 4",
        "log message 5",
        "log message 6",
        "log message 7",
        "log message 8",
        "log message 9",
        "log message 10",
        "log message 11",
        "log message 12",
        "log message 13",
        "log message 14",
        "log message 15",
        "log message 16",
        "log message 17",
        "log message 18",
        "log message 19",
        "log message 20",
    ];

    onMount(() => {
        const outputConsole = document.querySelector(".console")!;
        outputConsole.scrollTop = outputConsole.scrollHeight;
        // scrollToBottom(outputConsole);
    });

    // function scrollToBottom(outputConsole: HTMLElement) {

    // }
</script>

<div class="console h-full overflow-auto">
    {#each logs as log}
        <p class="text-neutral-100 pl-2 pr-2">$ {log}</p>
    {/each}
</div>
