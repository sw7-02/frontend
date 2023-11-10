<script lang="ts">
	import { page } from '$app/stores';

	// Assignements and exercises
	const name: string = 'Exercise 1: Hello World';
	const description: string = '';
	const language: string = '';

	// Additional attribtues for exercises
	const points: number = 0;
	const hints: string[] = [];
	const test_cases: string[] = [];
</script>

<title>{$page.params.exercise}</title>
<div class="grid grid-cols-2 justify-items-center" style="height: calc(100vh - 56px);">
	<div class="bg-neutral-700 border-neutral-900 border-2 mt-4 mb-4 w-[900px]">
		<p class="text-neutral-300 text-2xl m-2 underline">{name}</p>
	</div>
	<div class="bg-neutral-700 border-neutral-900 border-2 mt-4 mb-4 w-[900px]">
		<!-- insert editor -->
	</div>
</div>
