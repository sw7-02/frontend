<script lang="ts">
    import { page } from "$app/stores";
    import { fade } from "svelte/transition";
    import {
        jwtStore,
        isTeacherStore,
        userRoleStore,
    } from "$lib/stores/authentication";
    import { role } from "$lib/stores/authentication";
    import { courseIdStore, taskIdStore } from "$lib/stores/ids";
    import { get } from "svelte/store";
    import ExerciseRow from "./ExerciseRow.svelte";
    import Modal from "./Modal.svelte";
    import DeleteButton from "./DeleteButton.svelte";

    export let title: string;
    export let sessionId: number;
    export let exercises: { title: string; exercise_id: number }[];

    let showExerciseModal: boolean = false;
    let showSessionModal: boolean = false;
    let newExerciseTitle: string;
    let newSessionTitle: string = title.split(":")[1].trim();
    let showExercises = false;

    export let reloadSessions: () => void;

    function createExercise() {
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
            `http://localhost:8080/course/${get(
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
            `http://localhost:8080/course/${get(
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
            `http://localhost:8080/course/${get(
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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    on:click={() => (showExercises = !showExercises)}
    class="bg-neutral-900 grid grid-cols-1 items-center mt-1 cursor-pointer
			shadow-xl text-neutral-100 text-md w-[700px] h-16
			hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-green-700"
>
    <div class="flex justify-between">
        <div class="ml-6 flex items-center">
            {#if !showExercises}
                <i class="fa-solid fa-chevron-right w-5" />
            {:else}
                <i class="fa-solid fa-chevron-down w-5" />
            {/if}
            {title}
            {#if $jwtStore !== "" && ($userRoleStore === role.TEACHER || $userRoleStore === role.TA)}
                <div
                    on:click={() => (showSessionModal = true)}
                    on:click|stopPropagation
                    class="ml-1 p-1 text-sm rounded-sm bg-neutral-700 transition duration-200 ease-in-out
            text-neutral-400 hover:text-green-700 hover:bg-neutral-700 border border-neutral-700 bg-opacity-50 items-center"
                >
                    <i class="fa-solid fa-pencil fa-md" />
                </div>
            {/if}
        </div>
        {#if $jwtStore !== "" && $isTeacherStore === true}
            <div class="flex items-center">
                <div
                    on:click={() => (showExerciseModal = true)}
                    on:click|stopPropagation
                    class="flex items-center rounded-sm bg-neutral-700 transition duration-200 ease-in-out text-neutral-400
                 hover:text-green-700 hover:bg-neutral-700 text-sm pl-3 pr-3 mr-2 font-mono border border-neutral-700 bg-opacity-50"
                >
                    Add exercise
                </div>
                <DeleteButton onClick={deleteSession} />
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
            >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <DeleteButton
                    onClick={() => deleteExercise(exercise.exercise_id)}
                />
            </ExerciseRow>
        {/each}
    </div>
{/if}

<Modal
    bind:showModal={showExerciseModal}
    bind:newTitle={newExerciseTitle}
    onSubmit={createExercise}
    onCancel={() => (newExerciseTitle = "")}
/>

<Modal
    bind:showModal={showSessionModal}
    bind:newTitle={newSessionTitle}
    onSubmit={updateSessionTitle}
    onCancel={() => (newSessionTitle = title.split(":")[1].trim())}
/>
