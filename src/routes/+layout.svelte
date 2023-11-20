<script>
    import "../app.css";
    import { authentication } from "$lib/stores/authentication";
    import Login from "$lib/components/Login.svelte";
    import NavigationBar from "$lib/components/NavigationBar.svelte";
</script>

<!-- <body class="overflow-hidden bg-neutral-950 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-700 to-neutral-950"> -->
<body class="overflow-hidden bg-neutral-950 bg-opacity-90">
    <video
        class="absolute w-full h-full object-cover -z-10"
        muted
        autoplay
        loop
        playsinline
        disablepictureinpicture
    >
        <source src="/hacker.mp4" type="video/mp4" />
    </video>
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
