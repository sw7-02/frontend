<script lang="ts">
	export let title: string;
	export let href: string;
</script>

<a
	{href}
	class="bg-neutral-900 grid grid-cols-1 items-center shadow-xl text-neutral-100 text-sm font-mono w-[700px]
h-8 hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-blue-800"
>
	<div class="ml-6">{title}</div>
</a>
