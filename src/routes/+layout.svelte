<script>
    import "../app.css";
    import { jwtStore } from "$lib/stores/authentication";
    import NavigationBar from "$lib/components/NavigationBar.svelte";
    import Login from "$lib/components/Login.svelte";
</script>

<title>IMPRoved</title>
<body class="overflow-hidden bg-gray-800">
    {#if $jwtStore !== ""}
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
