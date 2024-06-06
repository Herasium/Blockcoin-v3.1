<script>
	export let data
    import Post from '$lib/elements/post.svelte';

</script>


{#each data.trending as post}
    <Post {post}/>
{/each}

