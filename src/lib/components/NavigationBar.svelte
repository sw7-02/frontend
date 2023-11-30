<script lang="ts">
    import { page } from "$app/stores";
    import { usernameStore } from "$lib/stores/authentication";
    import { get } from "svelte/store";
    import NavigationButton from "./NavigationButton.svelte";
    import LogoutButton from "./LogoutButton.svelte";

    let paths: string[] = [];
    let routes: string[] = [];
    let navigation: { path: string; route: string }[] = [];

    let username = get(usernameStore);

    $: {
        paths = $page.url.pathname.split("/");
        routes = [];
        navigation = [];

        paths = paths.filter((path) => path !== "" && path !== "course");

        let route = "/course";
        for (let i = 0; i < paths.length; i++) {
            let path = paths[i];
            route = route + "/" + paths[i];

            routes.push(route);
            navigation.push({ path, route });
        }
    }
</script>

<nav
    class="flex justify-between items-center bg-neutral-900 h-16 pl-2 pr-2 shadow-md"
>
    <div class="flex items-center">
        <NavigationButton text={"Courses"} href={"/"} />
        {#each navigation as nav}
            <p class="text-neutral-300 text-xl p-2">/</p>
            <NavigationButton
                text={decodeURIComponent(nav.path)}
                href={decodeURIComponent(nav.route)}
            />
        {/each}
    </div>
    <div class="flex items-center rounded-sm text-md">
        <div class="text-neutral-100 font-mono pl-3 pr-3 pt-1 pb-1">
            {username}
        </div>
        <LogoutButton />
    </div>
</nav>
