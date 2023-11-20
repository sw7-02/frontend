<script>
    import { page } from "$app/stores";
    import Leaderboard from "$lib/components/Leaderboard.svelte";
    import Statistics from "$lib/components/Statistics.svelte";
    import { authentication } from "$lib/stores/authentication";
</script>

<title>Leaderboard - {$page.params.course}</title>
<div
    class="grid grid-cols-1 justify-items-center overflow-hidden"
    style="height: calc(100vh - 64px);"
>
    <div class="flex overflow-hidden">
        <Leaderboard />
        {#if $authentication.isAuthenticated && $authentication.user.role === 0}
            <Statistics />
        {/if}
    </div>
</div>
