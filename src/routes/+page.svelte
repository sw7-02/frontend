<script lang="ts">
	import Course from '$lib/components/Course.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let courses: { title: string; href: string }[] = [
		{ title: 'Imperative Programming', href: 'IMPR' },
		{ title: 'Object-Oriented Programming', href: 'OOP' },
		{ title: 'Programming Paradigms', href: 'PP' }
	];

	let showModal: boolean = false;
	let newCourseTitle: string = '';

	// TODO: Need to somehow update list of courses when deleting it
	// (possibly use the "deleted" variable in the component Square)

	function onSubmit() {
		// TODO: Put the new course in the database and fetch all courses
		courses = [...courses, { title: newCourseTitle, href: newCourseTitle }];
		newCourseTitle = '';
	}
</script>

<title>IMPRoved</title>
<p class="flex justify-center text-neutral-100 text-md m-2 underline font-mono cursor-default">
	Courses
</p>
<div class="flex justify-center">
	<div class="grid grid-cols-3 justify-items-center">
		{#each courses as course}
			<Course title={course.title} href={'course/' + course.href} />
		{/each}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => (showModal = true)}
			class="bg-neutral-700 justify-center items-center flex m-1 bg-opacity-50
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
