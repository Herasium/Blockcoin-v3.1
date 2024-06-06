<script>
	export let data;
	import Post from '$lib/elements/post.svelte';
	import { text } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	
	let divHeights = [];

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		function updateDivHeights() {
			divHeights = Array.from(document.querySelectorAll('#post-container div'))
				.map((div) => {
					if (div.children.length > 0 && div.getAttribute('contenteditable') === 'false') {
						return div.clientHeight;
					} else {
						return null;
					}
				})
				.filter((height) => height !== null);
		}
		async function fetch_more() {

				const response = await fetch('/trending/post?offset=' + (present_offset[present_offset.length-1]+1))
					.then(function (response) {
						return response;
					})
					.then(async function (response) {
						const status = response.status
						const data = await response.text()
						if (status != 200 && status != 304) {
							return false
						}
						cache = data;
						present_offset.push(present_offset[present_offset.length-1]+1 );
						
						apiHtml.update((value) => [...value, cache]);
						api_html_writable.push(cache);
						const index = present_offset.indexOf(0);
						if (index != -1) {
							const a = present_offset.splice(index, 1);
						}
						if (present_offset.length > 2) {
							updateDivHeights();
							
							window.scrollBy(0, 0 - divHeights[0]);
							
							apiHtml.set(api_html_writable.slice(-2));
							
							api_html_writable = api_html_writable.slice(-2)
							present_offset = present_offset.slice(-2);
						}
					});
		
		}

		async function fetch_first() {
			if (present_offset.includes(present_offset[0] - 1) == false) {
				if (present_offset[0] - 1 > 0) {
					const response = await fetch('/trending/post?offset=' + (present_offset[0] - 1))
						.then(function (response) {
							return response.text();
						})
						.then(function (data) {
							present_offset.unshift(present_offset[0] - 1);
							
							apiHtml.update((value) => [data, ...value]);
							api_html_writable.unshift(data);
                            if (api_html_writable.length > 2) {
								updateDivHeights();
								
                                apiHtml.set(api_html_writable.slice(0, 2));
					            present_offset = present_offset.slice(0, 2);
								
                                api_html_writable = api_html_writable.slice(0, 2)
								
                                window.scrollBy(0, divHeights[0]);
                            }
						});
				}
			}
		}
        function handleScroll() {
		var body = document.body,
			html = document.documentElement;
		var height = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		);
		if (window.innerHeight + window.scrollY >= height * 0.9 && !loaded) {
			loaded = true;
			offset++;
			fetch_more().then((data) => {
				loaded = false;
			});
		}
		
		if (window.scrollY <= (document.getElementById("first-container").clientHeight*1.3) && !loaded && offset > 1) {
			loaded = true;
			offset -= 1;
			fetch_first().then((data) => {
				loaded = false;
			});
		}
	}
	});

	let apicache = undefined;
	let loaded = false;
	let offset = 1;
	let apiHtml = writable([]);
	
	let api_html_writable = [];
	let present_offset = [0];
	
	let cache = undefined;
</script>

<div id="post-container">
	{#if data.trending != null}
		<div id="first-container">
			{#each data.trending as post}
				<Post {post} />
			{/each}
		</div>
		{#each $apiHtml as data}
			<div bind:innerHTML={data} contenteditable="false"></div>
		{/each}
	{:else}
		<div class="text">WoW!<br>It's pretty empty in there! <br>Why not create a post ?</div>
	{/if}
</div>

<style>
	.text {
        font-family: var(--text-font);
        font-weight: var(--text-weight-normal);
        font-size: var(--text-size-3);
        color: var(--text-color);
        text-align: center;
		height: 100%;
		top:0;
		width: 100%;
		left: 0;
		position: fixed;
		justify-content: center;
		align-items: center;
		display: flex;
    }
	#first-container {
		width: 100%;
	}
	#post-container {
		width: 80%;
		top: 7.5%;
		left: 10%;
		position: absolute;
		display: flex;
		justify-content: center;
	}
	@media screen and (max-width: 550px) {
		#post-container {
			width: 95%;
			top: 0%;
			left: 2.5%;
			position: absolute;
		}
	}
</style>

