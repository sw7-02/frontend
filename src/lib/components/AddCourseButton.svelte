<script lang="ts">
    export let onClick: () => void;
</script>

<button
    on:click={onClick}
    class="w-[470px] h-[264px] justify-center items-center flex mt-4 ml-2 mr-2 bg-opacity-50 shadow-lg rounded-md bg-neutral-700 text-neutral-950
    text-xl hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-neutral-600 border border-neutral-800"
>
    <p><i class="fa-solid fa-plus pr-1" />Add course</p>
</button>
