<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Modal from './Modal.svelte';

	let showModal: boolean = false;
	export let title: string = 'title';
	export let href: string = '/';
	export let deleted: boolean = false;

	function onSubmit() {}
</script>

<a
	{href}
	class="bg-neutral-700 border-neutral-900 border-2 m-6 grid
			shadow-xl rounded-md text-neutral-300 w-60 h-60"
>
	<div class="grid grid-flow-col justify-end">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="flex float-right">
			<i
				class="fa-regular fa-trash-can fa-ss m-3"
				on:click|preventDefault={() => (deleted = true)}
			/>
			<i class="fa-solid fa-pencil fa-ss m-3" on:click|preventDefault={() => (showModal = true)} />
		</div>
	</div>

	<p class="text-3xl flex justify-center">{title}</p>
</a>

<Modal bind:showModal submitCallback={onSubmit}>
	<div class="flex flex-col grid-cols-1 justify-items-center">
		<input
			class="bg-neutral-500 m-2 w-[316] text-neutral-300"
			type="text"
			placeholder="Title"
			bind:value={title}
		/>
	</div>
</Modal>
