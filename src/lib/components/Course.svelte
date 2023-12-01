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
    class="grid grid-cols-1 bg-neutral-900 mt-4 ml-2 mr-2 rounded-sm text-neutral-100 w-[470px] h-[264px] shadow-xl
		hover:bg-neutral-800 transition duration-200 ease-in-out"
    href={"course/" + title}
>
    <p id="title" class="text-xl flex justify-center items-center">
        {title}
    </p>
    <div class="flex justify-evenly items-center">
        <LeaderboardButton course={title} />
        {#if $jwtStore !== "" && $isTeacherStore === true}
            <EditButton onClick={() => (showModal = true)} />
            <DeleteButton onClick={deleteCourse} />
        {/if}
    </div>
</a>

<Modal
    bind:showModal
    bind:newTitle={newCourseTitle}
    onSubmit={updateCourseTitle}
    onCancel={() => {}}
/>
