<script lang="ts">
    import {
        jwtStore,
        isTeacherStore,
        usernameStore,
    } from "$lib/stores/authentication";

    function handleLogout() {
        jwtStore.set("");
        usernameStore.set("");
        isTeacherStore.set(false);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:click={handleLogout}
    class="flex items-center rounded-sm bg-neutral-800 hover:bg-neutral-800 transition duration-200 ease-in-out"
>
    <a
        href="/"
        class="text-neutral-100 hover:text-green-700 text-md pl-3 pr-3 pb-1 pt-1 font-mono transition duration-200 ease-in-out"
        ><p>Log out</p></a
    >
</div>
