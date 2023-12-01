<script lang="ts">
    import { jwtStore, userRoleStore } from "$lib/stores/authentication";
    import { role } from "$lib/stores/authentication";
    import Modal from "./Modal.svelte";
    import EditButton from "./EditButton.svelte";
    import DeleteButton from "./DeleteButton.svelte";

    export let title: string = "Title";
    export let href: string = "/";
    export let showModal: boolean = false;
    export let newAssignmentTitle: string = "";

    function createAssignment() {}
    function deleteAssignment() {}
</script>

<a
    {href}
    class="bg-neutral-900 grid grid-cols-1 items-center mt-1
			shadow-xl text-neutral-100 text-md w-[700px] h-16
			hover:bg-neutral-800 transition duration-200 ease-in-out border border-neutral-600 rounded-md"
>
    <div class="flex justify-between">
        <div class="flex items-center ml-6">
            {title}
            {#if $jwtStore !== "" && ($userRoleStore === role.TEACHER || $userRoleStore === role.TA)}
                <div class="ml-1">
                    <EditButton onClick={() => (showModal = true)} />
                </div>
            {/if}
        </div>
        <DeleteButton onClick={deleteAssignment} />
    </div>
</a>

<Modal
    bind:showModal
    bind:newTitle={newAssignmentTitle}
    onSubmit={createAssignment}
    onCancel={() => (newAssignmentTitle = "")}
/>
