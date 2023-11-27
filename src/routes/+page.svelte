<script lang="ts">
    import { get } from "svelte/store";
    import { jwtAuth, teacherAuth } from "$lib/stores/authentication";
    import Course from "$lib/components/Course.svelte";
    import Modal from "$lib/components/Modal.svelte";

    let showModal: boolean = false;
    let newTitle: string = "";

    async function load() {
        return fetch("http://localhost:8080/course/", {
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

    function onSubmit() {
        // TODO: Put the new course in the database and fetch all courses
        // fetch("http://localhost:8080/course/", {
        //     method: "POST",
        //     headers: {
        //         auth: get(jwtAuth).jwt_token,
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ title: newTitle }),
        // }).then((response) => {
        //     if (response.ok) {
        //         response.headers.get("auth") &&
        //             jwtAuth.set({ jwt_token: response.headers.get("auth")! });
        //         load();
        //     } else {
        //         console.log("Failed to add course");
        //     }
        // });
    }
</script>

<title>IMPRoved</title>
<div class="flex justify-center">
    <div class="grid grid-cols-3 justify-items-center">
        {#await load() then data}
            {#each data as course}
                <Course title={course.title} id={course.course_id} />
            {/each}
        {/await}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#if $jwtAuth.jwt_token && $teacherAuth.is_teacher === true}
            <div
                on:click={() => (showModal = true)}
                class="bg-neutral-700 justify-center items-center flex mt-4 ml-2 mr-2 bg-opacity-50
			shadow-xl rounded-sm text-neutral-950 w-[470px] h-[264px] font-mono
			text-xl
			hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-green-700"
                style="cursor: pointer;"
            >
                <p>Add course</p>
            </div>
        {/if}
    </div>
</div>

<Modal bind:showModal bind:newTitle {onSubmit} onCancel={() => {}} />
