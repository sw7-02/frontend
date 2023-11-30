<script lang="ts">
    import { page } from "$app/stores";
    import { fade } from "svelte/transition";
    import { jwtStore, isTeacherStore } from "$lib/stores/authentication";
    import { courseIdStore } from "$lib/stores/ids";
    import { get } from "svelte/store";
    import ExerciseRow from "./ExerciseRow.svelte";
    import Modal from "./Modal.svelte";

    export let title: string;
    export let sessionId: number;
    export let exercises: { title: string; exercise_id: number }[];

    let showModal: boolean = false;
    let newTitle: string;
    let showExercises = false;

    export let reloadExercises: () => void;

    function createExercise() {
        showModal = false;
        showExercises = true;
        return fetch(
            `http://localhost:8080/course/${get(
                courseIdStore
            )}/session/${sessionId}/exercise`,
            {
                method: "POST",
                headers: {
                    auth: get(jwtStore),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: newTitle }),
            }
        ).then(async (response) => {
            if (response.ok) {
                reloadExercises();
                newTitle = "";
                return;
            } else {
                console.log(await response.text());
                return { error: "Failed to fetch data" };
            }
        });
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    on:click={() => (showExercises = !showExercises)}
    class="bg-neutral-900 grid grid-cols-1 items-center mt-1 cursor-pointer
			shadow-xl text-neutral-100 text-md w-[700px] h-16
			hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-green-700"
>
    <div class="flex justify-between">
        <div class="ml-6">
            {#if !showExercises}
                <i class="fa-solid fa-chevron-right w-5" />{title}
            {:else}
                <i class="fa-solid fa-chevron-down w-5" />{title}
            {/if}
        </div>
        {#if $jwtStore !== "" && $isTeacherStore === true}
            <div
                on:click={() => (showModal = true)}
                on:click|stopPropagation
                class="flex items-center rounded-sm bg-neutral-700 transition duration-200 ease-in-out text-neutral-400
                 hover:text-green-700 hover:bg-neutral-700 text-sm pl-3 pr-3 mr-6 font-mono border border-neutral-700 bg-opacity-50"
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
                title={"Exercise " + (i + 1) + ": " + exercise.title}
                href={$page.url +
                    "/" +
                    "Exercise " +
                    (i + 1) +
                    ": " +
                    exercise.title}
                id={exercise.exercise_id}
                {sessionId}
            />
        {/each}
    </div>
{/if}

<Modal
    bind:showModal
    bind:newTitle
    onSubmit={createExercise}
    onCancel={() => (newTitle = "")}
/>
