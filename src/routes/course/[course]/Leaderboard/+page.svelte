<script>
    import { page } from "$app/stores";
    import Leaderboard from "$lib/components/Leaderboard.svelte";
</script>

<title>Leaderboard - {$page.params.course}</title>
<div
    class="grid grid-cols-1 justify-items-center overflow-hidden"
    style="height: calc(100vh - 64px);"
>
    <div class="flex overflow-hidden">
        <Leaderboard />
    </div>
</div>
