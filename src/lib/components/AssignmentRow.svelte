<script lang="ts">
    export let title: string = "Title";
    export let href: string = "/";
</script>

<a
    {href}
    class="bg-neutral-900 grid grid-cols-1 items-center mt-1
			shadow-xl text-neutral-100 text-md font-mono w-[700px] h-16
			hover:bg-neutral-800 transition duration-200 ease-in-out hover:text-green-700"
>
    <div class="ml-6">{title}</div>
</a>
