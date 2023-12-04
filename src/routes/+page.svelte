<script lang="ts">
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { jwtStore, isTeacherStore } from "$lib/stores/authentication";
    import Course from "$lib/components/Course.svelte";
    import AddCourseButton from "$lib/components/AddCourseButton.svelte";
    import Modal from "$lib/components/Modal.svelte";

    let showModal: boolean = false;
    let newTitle: string = "";
    let data: any;

    async function load() {
        return fetch(`${import.meta.env.VITE_API_PREFIX}/course/`, {
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

    function createCourse() {
        return fetch(`${import.meta.env.VITE_API_PREFIX}/course`, {
            method: "POST",
            headers: {
                auth: get(jwtStore),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newTitle }),
        }).then(async (response) => {
            if (response.ok) {
                data = await load();
                newTitle = "";
                return;
            } else {
                console.log(await response.text());
                return { error: "Failed to fetch data" };
            }
        });
    }

    function deleteCourse(id: number) {
        return fetch(`${import.meta.env.VITE_API_PREFIX}/course/${id}`, {
            method: "DELETE",
            headers: {
                auth: get(jwtStore),
                "Content-Type": "application/json",
            },
        }).then(async (response) => {
            if (response.ok) {
                reload();
                data = await load();
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

    onMount(async () => {
        reload();
    });
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
