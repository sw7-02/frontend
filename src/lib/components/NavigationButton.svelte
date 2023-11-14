<script lang="ts">
	export let text: string = 'Click me';
	export let href: string = '/';
</script>

<div class="flex items-center rounded-sm hover:bg-neutral-800 transition duration-200 ease-in-out">
	<a
		{href}
		class="text-neutral-100 hover:text-green-700 text-md pl-3 pr-3 font-mono transition duration-200 ease-in-out"
		><p>{text}</p></a
	>
</div>
