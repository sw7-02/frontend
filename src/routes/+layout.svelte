<script>
	import '../app.css';
	import NavigationBar from '$lib/components/NavigationBar.svelte';
</script>

<body class="bg-neutral-950 overflow-hidden">
	<NavigationBar />
	<div class="overflow-auto" style="height: calc(100vh - 56px);">
		<slot />
	</div>
</body>
