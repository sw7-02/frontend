<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { oneDark } from "@codemirror/theme-one-dark";
    import DeleteModal from "./DeleteModal.svelte";

    export let testCases: string[];
    export let lang: any;

    let showModal: boolean = false;
    let currentTestCase: number = 0;
    let value: string;
    let deleteIndex: number;
    testCases.length > 0 ? (value = testCases[currentTestCase]) : (value = "");

    $: {
        testCases[currentTestCase] = value;
    }

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

    function setDeleteIndex(i: number) {
        showModal = true;
        deleteIndex = i;
    }

    function deleteTestCase(i: number) {
        if (testCases.length > 1) {
            testCases = [...testCases.slice(0, i), ...testCases.slice(i + 1)];
            currentTestCase = 0;
            value = testCases[currentTestCase];
        }
    }
</script>

<div>
    <div
        class="text-neutral-100 pt-2 pl-2 border-b border-t border-neutral-600 flex align-bottom"
    >
        {#each testCases as _, i}
            <button
                on:click={() => changeTestCase(i)}
                class="text-neutral-100 text-sm border-neutral-600 items-center justify-between bg-gray-800
                hover:bg-gray-600 transition duration-200 ease-in-out flex rounded-t-md border-t border-l border-r {i ===
                currentTestCase
                    ? 'bg-gray-700'
                    : ''}"
            >
                <p class="pl-2">Test Case {i + 1}</p>
                <button
                    on:click|preventDefault={() => setDeleteIndex(i)}
                    class="hover:bg-gray-700 hover:text-red-700 text-neutral-100 p-3 m-1 rounded-full relative"
                >
                    <span
                        class="absolute inset-0 flex items-center justify-center"
                    >
                        <i class="fa-solid fa-xmark text-md" />
                    </span>
                </button>
            </button>
        {/each}
        <button
            on:click={addTestCase}
            class="text-neutral-100 p-3 m-1 hover:bg-gray-700 transition duration-200 ease-in-out rounded-full relative"
        >
            <span class="absolute inset-0 flex items-center justify-center">
                <i class="fa-solid fa-plus text-sm" />
            </span></button
        >
    </div>
    <CodeMirror
        class="bg-neutral-900 text-neutral-100 w-full h-[300px] overflow-auto"
        bind:value
        tabSize={4}
        theme={oneDark}
        {lang}
    />
</div>
<DeleteModal
    bind:showModal
    onDelete={() => deleteTestCase(deleteIndex)}
    onCancel={() => (showModal = false)}
/>
