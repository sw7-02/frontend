<script lang="ts">
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { jwtStore, isTeacherStore } from "$lib/stores/authentication";
    import Course from "$lib/components/Course.svelte";
    import Modal from "$lib/components/Modal.svelte";

    let showModal: boolean = false;
    let newTitle: string = "";
    let data: any;

    async function load() {
        return fetch("http://localhost:8080/course/", {
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
        return fetch(`http://localhost:8080/course`, {
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
        return fetch(`http://localhost:8080/course/${id}`, {
            method: "DELETE",
            headers: {
                auth: get(jwtStore),
                "Content-Type": "application/json",
            },
        }).then(async (response) => {
            if (response.ok) {
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
            <button
                on:click={() => (showModal = true)}
                class="bg-neutral-700 justify-center items-center flex mt-4 ml-2 mr-2 bg-opacity-50
			shadow-xl rounded-sm text-neutral-950 w-[470px] h-[264px] font-mono
			text-xl
			hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-green-700"
                style="cursor: pointer;"
            >
                <p>Add course</p>
            </button>
        {/if}
    </div>
</div>

<Modal
    bind:showModal
    bind:newTitle
    onSubmit={createCourse}
    onCancel={() => {}}
/>
