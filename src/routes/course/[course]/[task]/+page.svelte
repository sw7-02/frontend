<script lang="ts">
	import { page } from '$app/stores';
	import Row from '$lib/components/Row.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let showModal: boolean = false;
	let newRowTitle: string = '';

	let exercises: string[] = [
		'exercise1',
		'exercise2',
		'exercise1',
		'exercise2',
		'exercise1',
		'exercise2',
		'exercise1',
		'exercise2',
		'exercise1',
		'exercise2',
		'exercise1',
		'exercise2'
	];

	function onSubmit() {
		// TODO: Put the new session/assignment in the database and fetch all sessions/assignments
		exercises = [...exercises, newRowTitle];
		newRowTitle = '';
	}
</script>

<title>{$page.params.task}</title>
<div class="flex justify-center">
	<div class="grid grid-cols-1 justify-items-center">
		<p class="text-neutral-300 text-2xl mt-4 underline">Exercises</p>
		{#each exercises as exercise}
			<Row title={exercise} href={$page.params.task + '/' + exercise} />
		{/each}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => (showModal = true)}
			class="bg-neutral-600 border-neutral-700 border-2 mt-4 mb-4 ml-2 mr-2 justify-center items-center flex shadow-xl rounded-md text-neutral-300 w-[700px] h-20"
			style="cursor: pointer;"
		>
			<i class="fa-regular fa-plus text-2xl text-neutral-700" />
		</div>
	</div>
</div>

<Modal bind:showModal submitCallback={onSubmit}>
	<div class="flex flex-col grid-cols-1 justify-items-center">
		<input
			class="bg-neutral-500 m-2 w-[316] text-neutral-300"
			type="text"
			placeholder="Title"
			bind:value={newRowTitle}
		/>
	</div>
</Modal>
