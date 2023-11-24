<script>
    import "../app.css";
    import { jwtAuth } from "$lib/stores/authentication";
    import Login from "$lib/components/Login.svelte";
    import NavigationBar from "$lib/components/NavigationBar.svelte";
    import Background from "$lib/components/Background.svelte";
</script>

<body class="overflow-hidden">
    <Background />
    {#if $jwtAuth.jwt_token}
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
