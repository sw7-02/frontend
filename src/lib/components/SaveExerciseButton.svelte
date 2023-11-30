<script lang="ts">
    export let updateExercise: () => {};
</script>

<div class="flex justify-end pt-2 h-[54px]">
    <button
        on:click={updateExercise}
        class="rounded-sm transition duration-200 ease-in-out text-neutral-100 bg-neutral-800
text-sm font-mono hover:bg-neutral-700 hover:text-white border border-neutral-700 w-[80px] h-[36px]"
        >Save</button
    >
</div>
