<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { jwtStore, isTeacherStore } from "$lib/stores/authentication";
    import { courseIdStore } from "$lib/stores/ids";
    import AssignmentRow from "$lib/components/AssignmentRow.svelte";
    import SessionRow from "$lib/components/SessionRow.svelte";
    import AddSessionAssigmentButton from "$lib/components/AddSessionAssigmentButton.svelte";

    async function load() {
        return fetch(`http://localhost:8080/course/${get(courseIdStore)}`, {
            method: "GET",
            headers: {
                auth: get(jwtStore),
                "Content-Type": "application/json",
            },
        }).then(async (response) => {
            if (response.ok) {
                response.headers.get("auth") &&
                    jwtStore.set(response.headers.get("auth")!);
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
        });
    }

    let assignments: string[] = ["Not implemented yet"];

    let data: any;

    async function reload() {
        data = await load();
    }

    onMount(async () => {
        reload();
    });
</script>

<title>{$page.params.course}</title>
<div class="flex justify-center mt-3 mb-3">
    <div class="grid grid-cols-2 justify-items-center items-start">
        <div class="grid grid-cols-1 justify-items-center mr-2">
            {#if data}
                {#each data.sessions as session, i}
                    <SessionRow
                        reloadExercises={reload}
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
                />
            {/if}
        </div>
        <div class="grid grid-cols-1 justify-items-center ml-2">
            {#each assignments as assignment, i}
                <AssignmentRow
                    title={"Assignment " + (i + 1) + ": " + assignment}
                    href={$page.params.course + "/" + assignment}
                />
            {/each}
            {#if $jwtStore !== "" && $isTeacherStore === true}
                <AddSessionAssigmentButton
                    buttonText="Add assignment"
                    type={"assignment"}
                    reloadExercises={reload}
                />
            {/if}
        </div>
    </div>
</div>
