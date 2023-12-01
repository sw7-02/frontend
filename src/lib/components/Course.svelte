<script lang="ts">
    import Modal from "./Modal.svelte";
    import LeaderboardButton from "./LeaderboardButton.svelte";
    import {
        jwtStore,
        isTeacherStore,
        userRoleStore,
    } from "$lib/stores/authentication";
    import { courseIdStore } from "$lib/stores/ids";

    let showModal: boolean = false;
    let isHovered: boolean = false;

    export let title: string = "title";
    export let id: number;
    export let userRole: number;

    export let deleteCourse: () => void;
    function onSubmit() {
        // TODO: Put the new course in the database and fetch all courses
    }
</script>

<a
    on:click={() => courseIdStore.set(id)}
    on:click={() => userRoleStore.set(userRole)}
    class="grid grid-cols-1 bg-neutral-900 mt-4 ml-2 mr-2 rounded-sm text-neutral-100 w-[470px] h-[264px] shadow-xl
		hover:bg-neutral-800 transition duration-200 ease-in-out"
    href={"course/" + title}
>
    <p id="title" class="text-xl flex justify-center items-center">
        {title}
    </p>
    <div class="flex justify-evenly items-center">
        <LeaderboardButton course={title} />
        {#if $jwtStore !== "" && $isTeacherStore === true}
            <button
                on:click|preventDefault={() => (showModal = true)}
                class="flex items-center text-neutral-100 text-sm font-mono h-10 p-2 rounded-sm hover:bg-neutral-700 hover:text-white
                    border border-neutral-700"
            >
                <i class="fa-solid fa-pencil fa-md pr-1" />
                Edit
            </button>
            <button
                on:click|preventDefault={deleteCourse}
                class="flex items-center text-neutral-100 text-sm font-mono h-10 p-2 rounded-sm hover:bg-neutral-700 hover:text-white
                       border border-neutral-700"
            >
                <i class="fa-solid fa-trash-can fa-md pr-1" />
                Delete
            </button>
        {/if}
    </div>
</a>

<Modal bind:showModal bind:newTitle={title} {onSubmit} onCancel={() => {}} />
