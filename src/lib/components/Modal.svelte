<script lang="ts">
    export let showModal: boolean;
    export let newTitle: string = "";

    let dialog: any;
    let isTitleEmpty = false;

    $: if (dialog && showModal) dialog.showModal();

    export let onSubmit: () => void;
    export let onCancel: () => void;

    function handleKeyPress(event: KeyboardEvent) {
        if (event.key === "ESC") {
            onCancel();
            dialog.close();
        } else if (event.key === "Enter") {
            if (isTitleEmpty) {
                return;
            }
            onSubmit();
            dialog.close();
        }
    }

    function closeModalSubmit() {
        if (newTitle === "") {
            isTitleEmpty = true;
            return;
        }
        if (newTitle !== "") {
            isTitleEmpty = false;
            onSubmit();
            dialog.close();
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    class="bg-neutral-900 rounded-md p-8 border border-neutral-600"
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}
    on:keypress={handleKeyPress}
>
    <div class="flex flex-col grid-cols-1 justify-items-center">
        {#if isTitleEmpty}
            <p class="text-red-500 ml-4">Title cannot be empty</p>
        {/if}
        <input
            class="bg-neutral-700 m-2 p-4 w-[316px] h-[40px] text-neutral-100 border border-neutral-600 rounded-md"
            type="text"
            placeholder="Title"
            bind:value={newTitle}
        />
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="flex flex-col grid-cols-1 justify-items-center"
        on:click|stopPropagation
    >
        <div class="flex justify-between">
            <button
                class="text-neutral-100 m-2 p-2 rounded-md bg-neutral-800 w-[150px] border border-neutral-600
				transition duration-200 ease-in-out hover:bg-red-900"
                on:click={onCancel}
                on:click={() => dialog.close()}>Cancel</button
            >
            <button
                class="text-neutral-100 m-2 p-2 rounded-md bg-neutral-800 w-[150px] border border-neutral-600
				transition duration-200 ease-in-out hover:bg-green-900"
                on:click={closeModalSubmit}>Submit</button
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
