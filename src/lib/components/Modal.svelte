<script lang="ts">
    export let showModal: boolean;

    let dialog: any;

    $: if (dialog && showModal) dialog.showModal();

    export let submitCallback: () => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    class="bg-neutral-800 rounded-md p-8"
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}
    on:keypress={(event) => {
        if (event.key === "Enter") {
            dialog.close();
        }
    }}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="flex flex-col grid-cols-1 justify-items-center"
        on:click|stopPropagation
    >
        <div><slot /></div>
        <div class="flex justify-between">
            <button
                class="text-neutral-100 m-2 p-2 rounded-sm bg-neutral-900 w-[150px]
				transition duration-200 ease-in-out hover:bg-red-900"
                on:click={() => dialog.close()}>Cancel</button
            >
            <button
                class="text-neutral-100 m-2 p-2 rounded-sm bg-neutral-900 w-[150px]
				transition duration-200 ease-in-out hover:bg-green-900"
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
