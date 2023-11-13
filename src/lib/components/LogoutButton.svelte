<script lang="ts">
	import { authentication } from '$lib/stores/authentication';

	export let text: string = 'Click me';
	export let href: string = '/';

	function handleLogout() {
		authentication.set({
			isAuthenticated: false,
			user: null
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
		{href}
		class="text-neutral-100 hover:text-green-700 text-md pl-3 pr-3 font-mono transition duration-200 ease-in-out"
		><p>{text}</p></a
	>
</div>
