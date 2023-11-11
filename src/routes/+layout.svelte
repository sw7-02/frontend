<script>
	import '../app.css';
	import NavigationBar from '$lib/components/NavigationBar.svelte';
</script>

<body class="bg-neutral-950 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-700  to-black">
	<NavigationBar />
	<div class="overflow-auto" style="height: calc(100vh - 56px);">
		<slot />
	</div>
</body>

