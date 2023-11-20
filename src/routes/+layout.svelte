<script>
    import "../app.css";
    import { authentication } from "$lib/stores/authentication";
    import Login from "$lib/components/Login.svelte";
    import NavigationBar from "$lib/components/NavigationBar.svelte";
</script>

<body
    class="bg-neutral-950 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-700 to-neutral-950"
>
    {#if $authentication.isAuthenticated}
        <NavigationBar />
        <div class="overflow-auto" style="height: calc(100vh - 64px);">
            <slot />
        </div>
    {:else}
        <div class="flex items-center justify-center h-screen">
            <Login />
        </div>
    {/if}
</body>
