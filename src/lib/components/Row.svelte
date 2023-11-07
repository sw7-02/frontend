<script lang="ts">
	export let title: string = 'Title';
	export let href: string = '/';
</script>

<a
	{href}
	class="bg-neutral-700 border-neutral-900 border-2 mt-4 ml-2 mr-2 grid grid-cols-1 items-center
			shadow-xl rounded-md text-neutral-300 text-2xl w-[700px] h-20"
>
	<div class="ml-6">{title}</div>
</a>
