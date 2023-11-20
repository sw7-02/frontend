<script lang="ts">
    import { page } from "$app/stores";
    import { fade } from "svelte/transition";
    import { authentication } from "$lib/stores/authentication";
    import ExerciseRow from "./ExerciseRow.svelte";
    import Modal from "./Modal.svelte";

    export let title: string;
    let showModal: boolean = false;
    let newExerciseTitle: string;

    let exercises: { title: string; href: string }[] = [
        { title: "Do something", href: "/Do something" },
        { title: "Learn something", href: "/Learn something" },
        { title: "Remember something", href: "/Remember something" },
    ];

    let showExercises = false;

    function onSubmit() {
        showModal = false;
        showExercises = true;
        // TODO: Put the new course in the database and fetch all courses
        const newExercise = { title: newExerciseTitle };
        exercises = [
            ...exercises,
            { title: newExerciseTitle, href: "/" + newExerciseTitle },
        ];
        newExerciseTitle = "";
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    on:click={() => (showExercises = !showExercises)}
    class="bg-neutral-900 grid grid-cols-1 items-center mt-1 cursor-pointer
			shadow-xl text-neutral-100 text-md font-mono w-[700px] h-16
			hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-green-700"
>
    <div class="flex justify-between">
        <div class="ml-6">{title}</div>
        {#if $authentication.isAuthenticated && $authentication.user.role === 0}
            <div
                on:click={() => (showModal = true)}
                on:click|stopPropagation
                class="flex items-center rounded-sm bg-neutral-700 transition duration-200 ease-in-out text-neutral-950
                 hover:text-green-700 hover:bg-neutral-800 text-sm pl-3 pr-3 mr-6 font-mono border border-neutral-700 bg-opacity-50"
            >
                Add exercise
            </div>
        {/if}
    </div>
</div>
{#if showExercises}
    <div in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
        {#each exercises as exercise, i}
            <ExerciseRow
                {i}
                title={"> Exercise " + i + ": " + exercise.title}
                href={$page.url + "> Exercise " + i + ": " + exercise.href}
            />
        {/each}
    </div>
{/if}

<Modal bind:showModal submitCallback={onSubmit}>
    <div class="flex flex-col grid-cols-1 justify-items-center">
        <input
            on:keypress={(event) => {
                if (event.key === "Enter") {
                    onSubmit();
                }
            }}
            class="bg-neutral-700 m-2 p-4 w-[316px] h-[40px] text-neutral-100 outline-none"
            type="text"
            placeholder="Title"
            bind:value={newExerciseTitle}
        />
    </div>
</Modal>
