<script lang="ts">
    import {
        jwtStore,
        isTeacherStore,
        usernameStore,
    } from "$lib/stores/authentication";
    import { goto } from "$app/navigation";

    function handleLogout() {
        jwtStore.set("");
        usernameStore.set("");
        isTeacherStore.set(false);
        goto("/");
    }
</script>

<button
    on:click={handleLogout}
    class="flex items-center rounded-sm bg-neutral-800 hover:bg-neutral-700 transition duration-200 ease-in-out
    text-neutral-100 text-md pl-3 pr-3 pb-1 pt-1 font-mono border border-neutral-700"
>
    Log out
</button>
