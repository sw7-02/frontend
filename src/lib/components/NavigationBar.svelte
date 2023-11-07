<script lang="ts">
	import { page } from '$app/stores';
	import NavigationButton from './NavigationButton.svelte';

	let paths: string[] = [];
	let routes: string[] = [];
	let navigation: { path: string; route: string }[] = [];

	$: {
		paths = $page.url.pathname.split('/');
		routes = [];
		navigation = [];

		paths = paths.filter((path) => path !== '' && path !== 'course');

		for (let i = 0; i < paths.length; i++) {
			let path = paths[i];
			let route = '/course/' + path;

			routes.push(route);
			navigation.push({ path, route });
		}
	}
</script>

<nav class="flex justify-between bg-neutral-800 h-14 shadow-xl">
	<div class="flex">
		<NavigationButton text={'Courses'} href={'/'} />
		{#each navigation as nav}
			<p class="text-neutral-300 text-xl pt-4 pb-4">/</p>
			<NavigationButton text={nav.path} href={nav.route} />
		{/each}
	</div>
	<NavigationButton text={'Log out'} href={'/test'} />
</nav>
