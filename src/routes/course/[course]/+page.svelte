<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { jwtStore, isTeacherStore } from "$lib/stores/authentication";
    import { courseIdStore } from "$lib/stores/ids";
    import type { _CourseFull } from "$lib/types";
    import SessionRow from "$lib/components/SessionRow.svelte";
    import AddSessionAssigmentButton from "$lib/components/AddSessionAssigmentButton.svelte";
    import { generateGet } from "$lib/fetchers";

    let data: _CourseFull;

    async function load() {
        return generateGet(`course/${get(courseIdStore)}`).then(
            async (response) => {
                if (response.ok) {
                    return response
                        .json()
                        .then((data) => {
                            return data;
                        })
                        .catch((error) => {
                            console.log(error);
                            return { error: "Failed to parse data" };
                        });
                } else {
                    console.log(await response.text());
                    return { error: "Failed to fetch data" };
                }
            }
        );
    }

    async function reload() {
        data = await load();
    }

    onMount(reload);
</script>

<title>{$page.params.course}</title>
<div class="flex justify-center mt-3 mb-3">
    <div class="grid grid-cols-2 justify-items-center items-start">
        <div class="grid grid-cols-1 justify-items-center mr-2">
            {#if data}
                {#each data.sessions as session, i}
                    <SessionRow
                        order={i + 1}
                        reloadSessions={reload}
                        title={"Session " + (i + 1) + ": " + session.title}
                        sessionId={session.session_id}
                        exercises={session.exercises}
                    />
                {/each}
            {/if}
            {#if $jwtStore !== "" && $isTeacherStore === true}
                <AddSessionAssigmentButton
                    buttonText="Add session"
                    type={"session"}
                    reloadExercises={reload}
                    rowAmount={data ? data.sessions.length : 0}
                />
            {/if}
        </div>
        <div class="grid grid-cols-1 justify-items-center ml-2">
            <!-- {#each data.assignments as assignment, i}
                <AssignmentRow
                    title={"Assignment " + (i + 1) + ": " + assignment}
                    href={$page.params.course + "/" + assignment}
                />
            {/each} -->
            {#if $jwtStore !== "" && $isTeacherStore === true}
                <!-- If assigments are implemented, change rowAmount to {data ? data.assignments.length : 0} -->
                <AddSessionAssigmentButton
                    buttonText="Add assignment"
                    type={"assignment"}
                    reloadExercises={reload}
                    rowAmount={data ? 0 : 0}
                />
            {/if}
        </div>
    </div>
</div>
