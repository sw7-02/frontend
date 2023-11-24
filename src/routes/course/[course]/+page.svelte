<script lang="ts">
    import { page } from "$app/stores";
    import { authentication } from "$lib/stores/authentication";
    import AssignmentRow from "$lib/components/AssignmentRow.svelte";
    import SessionRow from "$lib/components/SessionRow.svelte";
    import Modal from "$lib/components/Modal.svelte";

    let showModal: boolean = false;
    let newRowTitle: string;
    let newRowType: string;

    let sessions: string[] = [
        "Introduction to the course",
        "Hello World!",
        "Variables and Types",
        "Conditionals",
        "Loops",
        "Functions",
        "Arrays",
        "Objects",
        "Classes",
        "Modules",
        "Promises",
        "Async/Await",
        "Fetch",
    ];

    let assignments: string[] = [
        "Yatzy",
        "Yatzy 2.0",
        "Yatzy 3.0",
        "Yatzy 4.0",
    ];

    function onSubmit() {
        // TODO: Put the new session/assignment in the database and fetch all sessions/assignments
        if (newRowType === "session") {
            sessions = [...sessions, newRowTitle];
        }
        if (newRowType === "assignment") {
            assignments = [...assignments, newRowTitle];
        }
        newRowTitle = "";
    }
</script>

<title>{$page.params.course}</title>
<div class="flex justify-center mt-3 mb-3">
    <div class="grid grid-cols-2 justify-items-center items-start">
        <div class="grid grid-cols-1 justify-items-center mr-2">
            {#each sessions as session, i}
                <SessionRow title={"Session " + (i + 1) + ": " + session} />
            {/each}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#if $authentication.isAuthenticated && $authentication.user.role === 0}
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
            {#each assignments as assignment, i}
                <AssignmentRow
                    title={"Assignment " + (i + 1) + ": " + assignment}
                    href={$page.params.course + "/" + assignment}
                />
            {/each}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#if $authentication.isAuthenticated && $authentication.user.role === 0}
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
