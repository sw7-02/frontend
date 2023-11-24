<script lang="ts">
    import { jwtAuth, teacherAuth } from "$lib/stores/authentication";

    function handleLogout() {
        jwtAuth.set({
            jwt_token: "",
        });
        teacherAuth.set({
            is_teacher: false,
        });
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:click={handleLogout}
    class="flex items-center rounded-sm hover:bg-neutral-800 transition duration-200 ease-in-out"
>
    <a
        href="/"
        class="text-neutral-100 hover:text-green-700 text-md pl-3 pr-3 font-mono transition duration-200 ease-in-out"
        ><p>Log out</p></a
    >
</div>
