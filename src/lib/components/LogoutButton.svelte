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
    class="flex items-center rounded-md bg-gray-800 hover:bg-gray-700 transition duration-200 ease-in-out
    text-neutral-100 text-md pl-3 pr-3 pb-1 pt-1 font-light border border-neutral-600"
>
    <i class="fa-solid fa-arrow-right-from-bracket mr-1" />
    Log out
</button>
