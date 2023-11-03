<script>
	export let text = 'text';
	export let href = '/';
</script>

<a
	{href}
	class="bg-neutral-800 border-neutral-900 border-2 m-6 grid grid-cols-1 items-center
			shadow-xl rounded-md text-neutral-300 text-3xl p-3 w-60 h-60"
>
	<div class="flex justify-center">{text}</div>
</a>
