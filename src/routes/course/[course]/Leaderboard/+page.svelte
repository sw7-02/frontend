<script>
    import Leaderboard from "$lib/components/Leaderboard.svelte";
    import Statistics from "$lib/components/Statistics.svelte";
</script>

<div
    class="grid grid-cols-1 justify-items-center overflow-hidden"
    style="height: calc(100vh - 64px);"
>
    <div class="flex overflow-hidden">
        <Leaderboard />
        <Statistics />
    </div>
</div>
