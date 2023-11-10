<script lang="ts">
	import Square from '$lib/components/Square.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let squares = [{ title: 'IMPR' }, { title: 'OOP' }, { title: 'PP' }];

	let showModal: boolean = false;
	let newSquareTitle: string = '';

	// TODO: Need to somehow update list of courses when deleting it
	// (possibly use the "deleted" variable in the component Square)

	function onSubmit() {
		// TODO: Put the new course in the database and fetch all courses
		squares = [...squares, { title: newSquareTitle }];
		newSquareTitle = '';
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
			on:click={() => (showModal = true)}
			class="bg-neutral-600 border-neutral-700 border-2 m-6 justify-center items-center flex
			shadow-xl rounded-md text-neutral-300 w-60 h-60"
			style="cursor: pointer;"
		>
			<i class="fa-regular fa-plus text-7xl text-neutral-700" />
		</div>
	</div>
</div>

<Modal bind:showModal submitCallback={onSubmit}>
	<div class="flex flex-col grid-cols-1 justify-items-center">
		<input
			class="bg-neutral-500 m-2 w-[316] text-neutral-300"
			type="text"
			placeholder="Title"
			bind:value={newSquareTitle}
		/>
	</div>
</Modal>
