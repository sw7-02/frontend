<script>
    import "../app.css";
    import { jwtStore } from "$lib/stores/authentication";
    import NavigationBar from "$lib/components/NavigationBar.svelte";
    import Login from "$lib/components/Login.svelte";
    import BackgroundLogin from "$lib/components/BackgroundLogin.svelte";
    import Background from "$lib/components/Background.svelte";
</script>

{#if $jwtStore !== ""}
    <title>IMPRoved</title>
    <body class="overflow-hidden">
        <Background />
        <NavigationBar />
        <div class="overflow-auto" style="height: calc(100vh - 64px);">
            <slot />
        </div>
    </body>
{:else}
    <title>IMPRoved - Login</title>
    <body class="overflow-hidden">
        <div class="flex items-center justify-center h-screen">
            <BackgroundLogin />
            <Login />
        </div>
    </body>
{/if}
