<script lang="ts">
    import { page } from "$app/stores";
    import { fade } from "svelte/transition";
    import ExerciseRow from "./ExerciseRow.svelte";

    export let title: string;

    let exercises: { title: string; href: string }[] = [
        { title: "Do something", href: "/Do something" },
        { title: "Learn something", href: "/Learn something" },
        { title: "Remember something", href: "/Remember something" },
    ];

    let showExercises = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    on:click={() => (showExercises = !showExercises)}
    class="bg-neutral-900 grid grid-cols-1 items-center mt-1 cursor-default
			shadow-xl text-neutral-100 text-md font-mono w-[700px] h-16
			hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-green-700"
>
    <div class="ml-6">{title}</div>
</div>
{#if showExercises}
    <div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
        {#each exercises as exercise, i}
            <ExerciseRow
                title={"> Exercise " + i + ": " + exercise.title}
                href={$page.url + exercise.href}
            />
        {/each}
    </div>
{/if}
