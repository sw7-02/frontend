<script lang="ts">
    import Modal from "./Modal.svelte";
    import LeaderboardButton from "./LeaderboardButton.svelte";
    import { jwtAuth, teacherAuth } from "$lib/stores/authentication";

    let showModal: boolean = false;
    let isHovered: boolean = false;

    export let title: string = "title";

    function onDelete() {
        // TODO: Delete the course from the database and fetch all courses
    }
    function onSubmit() {
        // TODO: Put the new course in the database and fetch all courses
    }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a
    on:mouseover={() => (isHovered = true)}
    on:mouseout={() => (isHovered = false)}
    class="grid grid-cols-1 bg-neutral-900 mt-4 ml-2 mr-2 rounded-sm text-neutral-100 w-[470px] h-[264px] shadow-xl
		hover:bg-neutral-800 transition duration-200 ease-in-out"
    href={"course/" + title}
>
    <p
        id="title"
        class={`text-xl flex justify-center items-center ${
            isHovered
                ? "text-green-700 transition duration-200 ease-in-out"
                : ""
        }`}
    >
        {title}
    </p>
    <div class="flex justify-evenly items-center">
        <LeaderboardButton course={title} />
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#if $jwtAuth.jwt_token && $teacherAuth.is_teacher === true}
            <div
                on:click|preventDefault={() => (showModal = true)}
                class="flex items-center text-neutral-100 text-sm font-mono h-10 p-2 rounded-sm hover:bg-neutral-700 hover:text-white
                    border border-neutral-700"
            >
                <i class="fa-solid fa-pencil fa-md pr-1" />
                Edit
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                on:click|preventDefault={onDelete}
                class="flex items-center text-neutral-100 text-sm font-mono h-10 p-2 rounded-sm hover:bg-neutral-700 hover:text-white
                       border border-neutral-700"
            >
                <i class="fa-solid fa-trash-can fa-md pr-1" />
                Delete
            </div>
        {/if}
    </div>
</a>

<Modal bind:showModal bind:newTitle={title} {onSubmit} onCancel={() => {}} />
