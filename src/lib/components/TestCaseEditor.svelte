<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { oneDark } from "@codemirror/theme-one-dark";
    import * as marked from "marked";

    export let testCases: string[];

    let currentTestCase: number = 0;

    let value: string;
    testCases.length > 0 ? (value = testCases[currentTestCase]) : (value = "");
    export let lang: any;

    function changeTestCase(i: number) {
        testCases[currentTestCase] = value;
        value = testCases[i];
        currentTestCase = i;
    }

    function addTestCase() {
        if (testCases.length < 10) {
            testCases = [...testCases, ""];
        }
    }
</script>

<div>
    <p
        class="bg-neutral-800 text-neutral-100 pt-2 pl-2 border-b-[2px] border-t-[2px] border-neutral-700 flex align-bottom"
    >
        {#each testCases as _, i}
            <button
                on:click={() => changeTestCase(i)}
                class="text-neutral-100 text-sm border-t-[1px] border-l-[1px] border-neutral-500 pt-1 pb-1 pl-4 pr-4
                hover:bg-neutral-700 transition duration-200 ease-in-out hover:text-white {i ===
                currentTestCase
                    ? 'bg-neutral-600'
                    : ''}"
            >
                Test Case {i + 1}
            </button>
        {/each}
        <button
            on:click={addTestCase}
            class="bg-neutral-600 text-neutral-900 text-sm border-t-[1px] border-l-[1px] border-neutral-500 pt-1 pb-1 pl-4 pr-4
        hover:bg-neutral-500 transition duration-200 ease-in-out hover:text-black border-r-[1px]"
            >+</button
        >
    </p>
    <CodeMirror
        class="text-neutral-100 w-full h-[349px] overflow-auto"
        bind:value
        tabSize={4}
        theme={oneDark}
        {lang}
        on:change={() => {
            console.log(marked.parse(value));
        }}
    />
</div>
