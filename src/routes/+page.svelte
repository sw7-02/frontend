<script lang="ts">
    import { authentication } from "$lib/stores/authentication";
    import Course from "$lib/components/Course.svelte";
    import Modal from "$lib/components/Modal.svelte";

    // export let data;
    // console.log(data);

    let test_data: { title: string }[] = [
        { title: "Imperative Programming" },
        { title: "Object-Oriented Programming" },
        { title: "Programming Paradigms" },
    ];

    let showModal: boolean = false;
    let newTitle: string = "";

    function onSubmit() {
        // TODO: Put the new course in the database and fetch all courses
        const newCourse = { title: newTitle };
        test_data = [...test_data, newCourse];
        newTitle = "";
    }
</script>

<title>IMPRoved</title>
<div class="flex justify-center">
    <div class="grid grid-cols-3 justify-items-center">
        {#each test_data as course}
            <Course title={course.title} />
        {/each}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#if $authentication.isAuthenticated && $authentication.user.role === 0}
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

<Modal bind:showModal bind:newTitle submitCallback={onSubmit} />
