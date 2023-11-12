<script lang="ts">
	import { page } from '$app/stores';
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	//  TODO: Replace this with a fetch request to the API
	let exercise: {
		name: string;
		description: string;
		language: string;
		points: number;
		hints: string[];
		test_cases: string[];
	} = {
		name: 'Exercise 1: Hello World',
		description:
			'In this exercise, you will have an opportunity to learn the fundamentals of programming by creating a straightforward "Hello, World!" program in the C language. This serves as an excellent initiation to establish your coding abilities and opens the path to more demanding programming exercises.',
		language: 'C',
		points: 3,
		hints: ['Hint 1', 'Hint 2', 'Hint 3'],
		test_cases: ['Test case 1', 'Test case 2', 'Test case 3']
	};
</script>

<title>{$page.params.task}</title>
<div
	class="grid grid-cols-1 justify-items-center overflow-hidden"
	style="height: calc(100vh - 64px);"
>
	<div class="flex overflow-hidden">
		<div class="bg-neutral-900 mt-4 mb-4 mr-4 w-[700px]">
			<div class="flex justify-between">
				<p class="pt-4 pl-4 pr-4 text-neutral-100 text-md font-mono underline cursor-default">
					{exercise.name}
				</p>
				<p class="pt-4 pl-4 pr-4 text-green-700 text-md font-mono cursor-default">
					Points: {exercise.points}
				</p>
			</div>
			<p class="p-4 text-neutral-100 text-md cursor-default">
				{exercise.description}
			</p>
		</div>
		<div class="bg-neutral-900 mt-4 mb-4 w-[1100px] overflow-auto">
			<CodeEditor />
		</div>
	</div>
</div>
