<script lang="ts">
	import { page } from '$app/stores';
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';
	import { stringify } from 'postcss';

    // Assignements and exercises
    const name: string = '';
    const description: string = '';
    const language: string = '';

    // Additional attribtues for exercises
    const points: number = 0;
    const hints: string[] = [];
    const test_cases: string[] = [];


    // code_template
	let value = '//test';
</script>

<title>{$page.params.exercise}</title>
<div class="grid grid-cols-2 justify-items-center h-full">
	<div class="bg-neutral-700 border-neutral-900 border-2 mt-4 mb-4 w-[900px] h-full" />
	<div class="bg-neutral-700 border-neutral-900 border-2 mt-4 mb-4 w-[900px] h-full">
		<CodeMirror bind:value lang={javascript()} tabSize={4} />
	</div>
</div>
