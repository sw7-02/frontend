<script lang="ts">
	import { page } from '$app/stores';
	import Row from '$lib/components/Row.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let showModal: boolean = false;
	let newRowTitle: string = '';
	let newRowType: string = '';

	let sessions: string[] = ['Session 1', 'Session 2'];
	let assignments: string[] = ['Assignment 1', 'Assignment 2'];

	function onSubmit() {
		// TODO: Put the new session/assignment in the database and fetch all sessions/assignments
		if (newRowType === 'session') {
			sessions = [...sessions, newRowTitle];
		}
		if (newRowType === 'assignment') {
			assignments = [...assignments, newRowTitle];
		}
		newRowTitle = '';
	}
</script>

<title>{$page.params.course}</title>
<div class="flex justify-center">
	<div class="grid grid-cols-2 justify-items-center items-start">
		<div class="grid grid-cols-1 justify-items-center">
			<p class="text-neutral-300 text-2xl mt-4 underline">Sessions</p>
			{#each sessions as session}
				<Row title={session} href={'course/' + $page.params.course + session} />
			{/each}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				on:click={() => showModal = true}
				on:click={() => newRowType = "session"}
				class="bg-neutral-600 border-neutral-700 border-2 mt-4 ml-2 mr-2 justify-center items-center flex shadow-xl rounded-md text-neutral-300 w-[700px] h-20"
				style="cursor: pointer;"
			>
				<i class="fa-regular fa-plus text-2xl text-neutral-700" />
			</div>
		</div>
		<div class="grid grid-cols-1 justify-items-center">
			<p class="text-neutral-300 text-2xl mt-4 underline">Assignments</p>
			{#each assignments as assignment}
				<Row title={assignment} href={'course/' + $page.params.course + assignment} />
			{/each}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				on:click={() => showModal = true}
				on:click={() => newRowType = "assignment"}
				class="bg-neutral-600 border-neutral-700 border-2 mt-4 ml-2 mr-2 justify-center items-center flex shadow-xl rounded-md text-neutral-300 w-[700px] h-20"
				style="cursor: pointer;"
			>
				<i class="fa-regular fa-plus text-2xl text-neutral-700" />
			</div>
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
