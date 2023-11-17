<script lang="ts">
    import Course from "$lib/components/Course.svelte";
    import Modal from "$lib/components/Modal.svelte";

    let data: { title: string }[] = [
        { title: "Imperative Programming" },
        { title: "Object-Oriented Programming" },
        { title: "Programming Paradigms" },
    ];

    let showModal: boolean = false;
    let newCourseTitle: string = "";

    function onSubmit() {
        // TODO: Put the new course in the database and fetch all courses
        const newCourse = { title: newCourseTitle };
        data = [...data, newCourse];
        newCourseTitle = "";
    }
</script>

<title>IMPRoved</title>
<div class="flex justify-center">
    <div class="grid grid-cols-3 justify-items-center">
        {#each data as course}
            <Course title={course.title} />
        {/each}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            on:click={() => (showModal = true)}
            class="bg-neutral-700 justify-center items-center flex mt-4 ml-2 mr-2 bg-opacity-50
			shadow-xl rounded-sm text-neutral-950 w-[470px] h-[264px] font-mono
			text-xl
			hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-green-700"
            style="cursor: pointer;"
        >
            <p>Add new course</p>
        </div>
    </div>
</div>

<Modal bind:showModal submitCallback={onSubmit}>
    <div class="flex flex-col grid-cols-1 justify-items-center">
        <input
            class="bg-neutral-700 m-2 p-4 w-[316px] h-[40px] text-neutral-100 outline-none"
            type="text"
            placeholder="Title"
            bind:value={newCourseTitle}
        />
    </div>
</Modal>
