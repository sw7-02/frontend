<script>
	import NavigationButton from './NavigationButton.svelte';
</script>

<nav class="flex justify-between bg-neutral-800 h-14 shadow-xl">
	<NavigationButton text={'Courses'} href={'/'} />
	<NavigationButton text={'Log out'} href={'/test'} />
</nav>
