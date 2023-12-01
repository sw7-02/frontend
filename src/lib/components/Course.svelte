<script lang="ts">
    import { get } from "svelte/store";
    import {
        jwtStore,
        isTeacherStore,
        userRoleStore,
    } from "$lib/stores/authentication";
    import { courseIdStore } from "$lib/stores/ids";
    import Modal from "./Modal.svelte";
    import LeaderboardButton from "./LeaderboardButton.svelte";
    import DeleteButton from "./DeleteButton.svelte";
    import EditButton from "./EditButton.svelte";

    export let title: string;
    export let id: number;
    export let userRole: number;

    let showModal: boolean = false;
    let newCourseTitle: string = title.trim();

    export let deleteCourse: () => void;
    export let reloadCourses: () => void;

    function updateCourseTitle() {
        if (title === "") {
            return;
        }
        return fetch(`http://localhost:8080/course/${id}`, {
            method: "PUT",
            headers: {
                auth: get(jwtStore),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newCourseTitle }),
        }).then(async (response) => {
            if (response.ok) {
                reloadCourses();
                return;
            } else {
                console.log(await response.text());
                return { error: "Failed to fetch data" };
            }
        });
    }
</script>

<a
    on:click={() => courseIdStore.set(id)}
    on:click={() => userRoleStore.set(userRole)}
    class="grid grid-cols-1 justify-items-center bg-neutral-900 mt-4 ml-2 mr-2 rounded-md text-neutral-100 w-[470px] h-[264px] shadow-xl
		hover:bg-neutral-800 transition duration-200 ease-in-out border border-neutral-600"
    href={"course/" + title}
>
    {#if $jwtStore !== "" && $isTeacherStore === true}
        <div class="flex h-min mt-2 w-full justify-end">
            <DeleteButton onClick={deleteCourse} />
        </div>
    {/if}
    <div class="flex items-center">
        <p id="title" class="text-xl mr-1 ml-5">
            {title}
        </p>
        {#if $jwtStore !== "" && $isTeacherStore === true}
            <EditButton onClick={() => (showModal = true)} />
        {/if}
    </div>
    {#if $jwtStore !== "" && $isTeacherStore === true}
        <span class="mb-8" />
    {/if}
    <div class="flex items-center mb-4">
        <LeaderboardButton course={title} />
    </div>
</a>

<Modal
    bind:showModal
    bind:newTitle={newCourseTitle}
    onSubmit={updateCourseTitle}
    onCancel={() => {}}
/>
