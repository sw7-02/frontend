<script lang="ts">
	export let text: string = 'Click me';
	export let href: string = '/';
</script>

<a {href} class="text-neutral-300 text-xl p-4"><p>{text}</p></a>
