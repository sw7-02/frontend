<script>
    import { page } from "$app/stores";
    import { jwtStore, isTeacherStore } from "$lib/stores/authentication";
    import Leaderboard from "$lib/components/Leaderboard.svelte";
    import Statistics from "$lib/components/Statistics.svelte";
</script>

<title>Leaderboard - {$page.params.course}</title>
<div
    class="grid grid-cols-1 justify-items-center overflow-hidden"
    style="height: calc(100vh - 64px);"
>
    <div class="flex overflow-hidden">
        <Leaderboard />
        {#if $jwtStore !== "" && $isTeacherStore === true}
            <Statistics />
        {/if}
    </div>
</div>
