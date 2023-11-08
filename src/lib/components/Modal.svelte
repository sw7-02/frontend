<script lang="ts">
	export let showModal: boolean;

	let dialog: any;

	$: if (dialog && showModal) dialog.showModal();

	export let submitCallback: () => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="bg-neutral-600 rounded-md p-4"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="flex flex-col grid-cols-1 justify-items-center" on:click|stopPropagation>
		<div><slot /></div>
		<div class="flex justify-between">
			<button
				class="text-neutral-300 m-2 p-2 border-neutral-900 border-2 rounded-md bg-neutral-700 w-[150px]"
				on:click={() => dialog.close()}>Cancel</button
			>
			<button
				class="text-neutral-300 m-2 p-2 border-neutral-900 border-2 rounded-md bg-neutral-700 w-[150px]"
				on:click={submitCallback}
				on:click={() => dialog.close()}>Submit</button
			>
		</div>
	</div>
</dialog>

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
