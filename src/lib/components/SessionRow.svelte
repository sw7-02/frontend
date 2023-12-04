<script lang="ts">
    import { page } from "$app/stores";
    import { fade } from "svelte/transition";
    import {
        jwtStore,
        isTeacherStore,
        userRoleStore,
    } from "$lib/stores/authentication";
    import { Role } from "$lib/types";
    import { courseIdStore } from "$lib/stores/ids";
    import { get } from "svelte/store";
    import ExerciseRow from "./ExerciseRow.svelte";
    import Modal from "./Modal.svelte";
    import DeleteButton from "./DeleteButton.svelte";
    import EditButton from "./EditButton.svelte";

    export let title: string;
    export let order: number;
    export let sessionId: number;
    export let exercises: { title: string; exercise_id: number }[];

    let showExerciseModal: boolean = false;
    let showSessionModal: boolean = false;
    let newExerciseTitle: string;
    let newSessionTitle: string = title.split(":")[1].trim();
    let showExercises: boolean = false;
    let exerciseAmount: number;
    $: {
        exerciseAmount = exercises.length;
    }

    export let reloadSessions: () => void;

    function createExercise() {
        showExercises = true;
        return fetch(
            `${import.meta.env.VITE_API_PREFIX}/course/${get(
                courseIdStore
            )}/session/${sessionId}/exercise`,
            {
                method: "POST",
                headers: {
                    auth: get(jwtStore),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: newExerciseTitle }),
            }
        ).then(async (response) => {
            if (response.ok) {
                reloadSessions();
                newExerciseTitle = "";
                return;
            } else {
                console.log(await response.text());
                return { error: "Failed to fetch data" };
            }
        });
    }

    function deleteExercise(exerciseId: number) {
        return fetch(
            `${import.meta.env.VITE_API_PREFIX}/course/${get(
                courseIdStore
            )}/session/${sessionId}/exercise/${exerciseId}`,
            {
                method: "DELETE",
                headers: {
                    auth: get(jwtStore),
                    "Content-Type": "application/json",
                },
            }
        ).then(async (response) => {
            if (response.ok) {
                reloadSessions();
                return;
            } else {
                console.log(await response.text());
                return { error: "Failed to fetch data" };
            }
        });
    }

    function updateSessionTitle() {
        if (newSessionTitle === "") {
            return;
        }
        return fetch(
            `${import.meta.env.VITE_API_PREFIX}/course/${get(
                courseIdStore
            )}/session/${sessionId}`,
            {
                method: "PUT",
                headers: {
                    auth: get(jwtStore),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: newSessionTitle }),
            }
        ).then(async (response) => {
            if (response.ok) {
                reloadSessions();
                newExerciseTitle = "";
                return;
            } else {
                console.log(await response.text());
                return { error: "Failed to fetch data" };
            }
        });
    }

    function deleteSession() {
        return fetch(
            `${import.meta.env.VITE_API_PREFIX}/course/${get(
                courseIdStore
            )}/session/${sessionId}`,
            {
                method: "DELETE",
                headers: {
                    auth: get(jwtStore),
                    "Content-Type": "application/json",
                },
            }
        ).then(async (response) => {
            if (response.ok) {
                reloadSessions();
                return;
            } else {
                console.log(await response.text());
                return { error: "Failed to fetch data" };
            }
        });
    }
</script>

<button
    on:click={() => (showExercises = !showExercises)}
    class="bg-neutral-900 grid grid-cols-1 items-center mt-1 cursor-pointer
			shadow-lg text-neutral-100 text-md w-[700px] h-16
			hover:bg-neutral-800 transition duration-200 ease-in-out border border-neutral-600 rounded-md"
>
    <div class="flex justify-between">
        <div class="flex items-center ml-6">
            {#if !showExercises}
                <i
                    class="fa-solid fa-chevron-right w-5 text-sm text-neutral-500"
                />
            {:else}
                <i
                    class="fa-solid fa-chevron-down w-5 text-sm text-neutral-500"
                />
            {/if}
            {title}
            {#if $jwtStore !== "" && ($userRoleStore === Role.TEACHER || $userRoleStore === Role.TA)}
                <EditButton onClick={() => (showSessionModal = true)} />
            {/if}
        </div>
        {#if $jwtStore !== "" && $isTeacherStore === true}
            <div class="flex items-center">
                <button
                    on:click={() => (showExerciseModal = true)}
                    on:click|stopPropagation
                    class="flex items-center rounded-md bg-gray-800 transition duration-200 ease-in-out text-neutral-100
                  hover:bg-gray-700 text-sm pl-3 pr-3 pt-1 pb-1 mr-2 font-light border border-neutral-600"
                >
                    <i class="fa-solid fa-plus pr-1" />Add exercise
                </button>
                <div class="mr-2"><DeleteButton onClick={deleteSession} /></div>
            </div>
        {/if}
    </div>
</button>
{#if showExercises}
    <div in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
        {#each exercises as exercise, i}
            <ExerciseRow
                title={"Exercise " + (i + 1) + ": " + exercise.title}
                href={$page.url +
                    "/" +
                    "Exercise " +
                    (i + 1) +
                    ": " +
                    exercise.title}
                id={exercise.exercise_id}
                {sessionId}
            >
                {#if $jwtStore !== "" && ($userRoleStore === Role.TEACHER || $userRoleStore === Role.TA)}
                    <div class="mr-2">
                        <DeleteButton
                            onClick={() => deleteExercise(exercise.exercise_id)}
                        />
                    </div>
                {/if}
            </ExerciseRow>
        {/each}
    </div>
{/if}

<Modal
    bind:showModal={showExerciseModal}
    bind:newTitle={newExerciseTitle}
    onSubmit={createExercise}
    onCancel={() => (newExerciseTitle = "")}
    ><p class="pl-2 text-neutral-100">Exercise {exerciseAmount + 1}:</p></Modal
>

<Modal
    bind:showModal={showSessionModal}
    bind:newTitle={newSessionTitle}
    onSubmit={updateSessionTitle}
    onCancel={() => (newSessionTitle = title.split(":")[1].trim())}
    ><p class="pl-2 text-neutral-100">Session {order}:</p></Modal
>
