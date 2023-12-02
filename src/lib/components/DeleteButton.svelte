<script lang="ts">
    import DeleteModal from "./DeleteModal.svelte";

    let showModal: boolean = false;

    export let onClick: () => void;
</script>

<button
    on:click|stopPropagation={() => (showModal = true)}
    class="hover:bg-gray-700 hover:text-red-700 text-neutral-100 p-4 rounded-full relative"
>
    <span class="absolute inset-0 flex items-center justify-center">
        <i class="fa-solid fa-xmark text-md" />
    </span>
</button>
<DeleteModal
    bind:showModal
    onDelete={onClick}
    onCancel={() => (showModal = false)}
/>
