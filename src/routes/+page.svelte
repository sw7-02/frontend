<script lang="ts">
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { jwtStore, isTeacherStore } from "$lib/stores/authentication";
    import type { _CourseOverview } from "$lib/types";
    import Course from "$lib/components/Course.svelte";
    import AddCourseButton from "$lib/components/AddCourseButton.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import { generateDelete, generateGet, generatePost } from "$lib/fetchers";

    let showModal: boolean = false;
    let newTitle: string = "";
    let data: _CourseOverview;

    async function load() {
        return generateGet("course").then(async (response) => {
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
        });
    }

    async function createCourse() {
        let response = await generatePost("course", { title: newTitle });
        if (response.ok) {
            data = await load();
            newTitle = "";
            return;
        } else {
            console.log(await response.text());
            return { error: "Failed to fetch data" };
        }
    }

    async function deleteCourse(id: number) {
        return generateDelete(`course/${id}`).then(async (response) => {
            if (response.ok) {
                await reload();
                return;
            } else {
                console.log(await response.text());
                return { error: "Failed to fetch data" };
            }
        });
    }

    async function reload() {
        data = await load();
    }

    onMount(reload);
</script>

<title>IMPRoved</title>
<div class="flex justify-center">
    <div class="grid grid-cols-3 justify-items-center">
        {#if data}
            {#each data as course}
                <Course
                    title={course.title}
                    id={course.course_id}
                    userRole={course.user_role}
                    deleteCourse={() => deleteCourse(course.course_id)}
                    reloadCourses={reload}
                />
            {/each}
        {/if}
        {#if $jwtStore !== "" && $isTeacherStore === true}
            <AddCourseButton
                onClick={() => {
                    showModal = true;
                }}
            />
        {/if}
    </div>
</div>

<Modal
    bind:showModal
    bind:newTitle
    onSubmit={createCourse}
    onCancel={() => {}}
/>
