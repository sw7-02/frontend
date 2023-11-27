<script lang="ts">
    import { page } from "$app/stores";
    import { get } from "svelte/store";
    import { jwtAuth, teacherAuth } from "$lib/stores/authentication";
    import { courseIdStore } from "$lib/stores/ids";
    import AssignmentRow from "$lib/components/AssignmentRow.svelte";
    import SessionRow from "$lib/components/SessionRow.svelte";
    import Modal from "$lib/components/Modal.svelte";

    async function load() {
        const courseId = get(courseIdStore);
        console.log(courseId);
        console.log(`http://localhost:8080/course/${get(courseIdStore)}`);
        return fetch(`http://localhost:8080/course/${get(courseIdStore)}`, {
            method: "GET",
            headers: {
                auth: get(jwtAuth).jwt_token,
                "Content-Type": "application/json",
            },
        }).then(async (response) => {
            if (response.ok) {
                response.headers.get("auth") &&
                    jwtAuth.set({ jwt_token: response.headers.get("auth")! });
                return response
                    .json()
                    .then((data) => {
                        console.log(data);
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

    let showModal: boolean = false;
    let newRowTitle: string;
    let newRowType: string;

    function onSubmit() {
        // TODO: Put the new session/assignment in the database and fetch all sessions/assignments
    }
</script>

<title>{$page.params.course}</title>
<div class="flex justify-center mt-3 mb-3">
    <div class="grid grid-cols-2 justify-items-center items-start">
        <div class="grid grid-cols-1 justify-items-center mr-2">
            {#await load() then data}
                {#each data.sessions as session, i}
                    <SessionRow
                        title={"Session " + (i + 1) + ": " + session.title}
                        exercises={session.exercises}
                    />
                {/each}
            {/await}

            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#if $jwtAuth.jwt_token && $teacherAuth.is_teacher === true}
                <div
                    on:click={() => (showModal = true)}
                    on:click={() => (newRowType = "session")}
                    class="bg-neutral-700 justify-center items-center flex shadow-xl rounded-sm w-[700px] h-16 bg-opacity-50
				font-mono text-neutral-950 hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-green-700 mt-1"
                    style="cursor: pointer;"
                >
                    <p>Add session</p>
                </div>
            {/if}
        </div>
        <div class="grid grid-cols-1 justify-items-center ml-2">
            <!-- {#each assignments as assignment, i}
                <AssignmentRow
                    title={"Assignment " + (i + 1) + ": " + assignment}
                    href={$page.params.course + "/" + assignment}
                />
            {/each} -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#if $jwtAuth.jwt_token && $teacherAuth.is_teacher === true}
                <div
                    on:click={() => (showModal = true)}
                    on:click={() => (newRowType = "assignment")}
                    class="bg-neutral-700 justify-center items-center flex shadow-xl rounded-sm w-[700px] h-16 bg-opacity-50
				font-mono text-neutral-950 hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-green-700 mt-1"
                    style="cursor: pointer;"
                >
                    <p>Add assignment</p>
                </div>
            {/if}
        </div>
    </div>
</div>

<Modal
    bind:showModal
    bind:newTitle={newRowTitle}
    {onSubmit}
    onCancel={() => {
        newRowTitle = "";
    }}
/>
