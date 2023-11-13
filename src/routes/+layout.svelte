<script>
	import '../app.css';
	import Login from '$lib/components/Login.svelte';
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	import { authentication } from '$lib/stores/authentication';
	import { get } from 'svelte/store';

	// Make handling of authentication response and store the user data in svelte store?
	$: isAuth = get(authentication);
</script>

<body
	class="bg-neutral-950 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-700 to-neutral-950"
>
	{#if isAuth.isAuthenticated}
		<NavigationBar />
		<div class="overflow-auto" style="height: calc(100vh - 64px);">
			<slot />
		</div>
	{/if}
	{#if !isAuth.isAuthenticated}
		<div class="flex items-center justify-center h-screen">
			<Login />
		</div>
	{/if}
</body>
