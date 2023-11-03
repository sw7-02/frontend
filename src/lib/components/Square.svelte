<script lang="ts">
	export let title: string = 'title';
	export let href: string = '/';
</script>

<a
	{href}
	class="bg-neutral-700 border-neutral-900 border-2 m-6 grid grid-cols-1 items-center
			shadow-xl rounded-md text-neutral-300 text-3xl w-60 h-60"
>
	<div class="flex justify-center">{title}</div>
</a>
