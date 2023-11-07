<script>
	import Square from '$lib/components/Square.svelte';

	let squares = [{ title: 'IMPR' }, { title: 'OOP' }, { title: 'PP' }];

	function addSquare() {
		// TODO: Put the new course in the database and fetch all courses
		squares = [...squares, { title: 'new' }];
	}
</script>

<title>IMPRoved</title>
<div class="flex justify-center">
	<div class="grid grid-cols-3 justify-items-center">
		{#each squares as square}
			<Square title={square.title} href={'course/' + square.title} />
		{/each}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={addSquare}
			class="bg-neutral-600 border-neutral-700 border-2 m-6 justify-center items-center flex
			shadow-xl rounded-md text-neutral-300 w-60 h-60"
			style="cursor: pointer;"
		>
			<i class="fa-regular fa-plus text-9xl text-neutral-700" />
		</div>
	</div>
</div>
