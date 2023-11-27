<script>
    import { jwtAuth, teacherAuth } from "$lib/stores/authentication";

    export let course = "course";
</script>

<a
    href="course/{course}/Leaderboard"
    class="flex items-center text-neutral-100 text-sm font-mono h-10 p-2 rounded-sm hover:bg-neutral-700 hover:text-white border border-neutral-700"
    ><i class="fa-solid fa-ranking-star pr-1" />
    Leaderboard{#if $jwtAuth.jwt_token && $teacherAuth.is_teacher === true}
        /Statistics
    {/if}
</a>
