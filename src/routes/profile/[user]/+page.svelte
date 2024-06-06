<script>
    export let data;
    import {badges,titles} from "$lib/badges.js"
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

				const response = await fetch('/profile/'+data.user+'/post?offset=' + (present_offset[present_offset.length-1]+1))
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
					const response = await fetch('/profile/'+data.user+'/post?offset=' + (present_offset[0] - 1))
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

<div id="global-container">
    <img id="banner" src={data.banner} />
    <div id="banner-container">
        <div class="banrr left">
            <img id="profile-pic" src={data.profile_picture} />
            <div id="username">{data.display}</div>
            <div id="badges-container">                
                {#each data.badges as badge}
                    <span class="badge material-symbols-outlined" title="{titles[badge]}">{badges[badge]}</span>
                {/each}
            </div>
        </div>
        <div class="banrr right">
            <div id="follower-count">
                <span id="follower-count-int">{data.followers}</span>
            </div>
            <form method="post">
                {#if data.user_follow}
                    <button id="follow-button" type="submit">Unfollow</button>
                {:else}
                    <button id="follow-button" type="submit">Follow</button>
                {/if}
            </form>
        </div>
    </div>
    <div id="description">{data.about}</div>
    <div class="big-container">
        <div id="button-container">
            <div id="popular" class="button strong">Most Popular</div>
            <div id="buyed" class="button">Bought Posts</div>
        </div>
    </div>
	{#if data.posts != null}
		<div id="first-container">
			{#each data.posts as post}
				<Post {post} />
			{/each}
		</div>
		{#each $apiHtml as data}
			<div bind:innerHTML={data} contenteditable="false"></div>
		{/each}
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
    .badge {
        font-size: var(--text-size-3);
        color: var(--badge-color);
  
      }
    #global-container {
        top: 7.5%;
        left:0;
        position: absolute;
        width: 100%;
        min-height: 92.5%;
        height: auto;
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
    }
    #description {
        margin-top: 2%;
        width: 60%;
        left: 20%;
        font-family: var(--text-font), sans-serif;
        font-weight: var(--text-weight-normal);
        font-size: var(--text-size-2); /* Adjust font size */
        color: var(--text-color);
    }
	#post-container {
        margin-top: 1%;
		width: 60%;
		left: 10%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}
	@media screen and (max-width: 550px) {
		#post-container {
			width: 95%;
			left: 2.5%;
		}
	}

    #post-container post {
        width: 60%;
        height: fit-content;
        min-height: 5%;
        margin: 1%;
    }
    .big-container {
        width: 100%;
        left: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    #button-container {
        width: 60%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .button {
        font-family: var(--text-font), sans-serif;
        font-weight: var(--text-weight-normal);
        font-size: var(--text-size-2); /* Adjust font size */
        color: var(--text-color);
        margin-right: 5%;
        cursor: pointer;
    }
    .strong {
        font-weight: 600;
    }
    .badge {
        font-size: 50px;
        color: var(--text-color); /* Use text color for badge */
    }
    #badges-container {
        width: 20%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin: 1%;
    }
    #profile-pic {
        height: auto;
        display: block;
        width: 20%;
        object-fit: cover;
        border-radius: 256px;
    }
    .right {
        justify-content: flex-end;
        margin-right: 10.8%;
    }
    .left {
        justify-content: flex-start;
        margin-left: 10.8%;
    }
    #username {
        font-family: var(--text-font), sans-serif;
        font-weight: var(--text-weight-normal);
        font-size: var(--text-size-4); /* Adjust font size */
        left: 20%;
        color: var(--text-color);
        margin-left: 3%;
        margin-right: 1%;
    }
    #follower-count {
        font-family: var(--text-font), sans-serif;
        font-weight: var(--text-weight-normal);
        font-size: var(--text-size-3); /* Adjust font size */
        color: var(--text-color);
        margin: 3%;
    }
    #follow-button {
        background: none;
        cursor: pointer;
        transition-duration: 0.5s;
        font-family: var(--text-font), sans-serif;
        font-weight: var(--text-weight-normal);
        font-size: var(--text-size-3); /* Adjust font size */
        color: var(--text-color);
        border-radius: var(
            --global-border-radius-1
        ); /* Use global border radius */
        border: var(--global-border); /* Use global border */
        height: auto;
        width: auto;
        text-align: center;
    }
    #follow-button:hover {
        font-size: var(--text-size-3-5); /* Increase font size on hover */
    }
    #banner {
        height: auto;
        width: 100%;
        max-height: 24vh;
        object-fit: cover;
        left: 0;
    }
    .banrr {
        display: flex;
        width: 30%;
        flex-direction: row;
        align-items: center;
    }
    #banner-container {
        margin-top: 2%;
        left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        flex-direction: row;
        height: 0;
    }

    @media screen and (max-width: 1024px) and (min-width: 550px){
        #description {
            width:80%;
        }
        #button-container {
            width: 80%;
        }
    }

    @media screen and (max-width: 550px) {
        #global-container {
            top: 0;
        }
        #description {
            width:90%;
            text-align:center;
            margin-top: 7%;
            font-size: var(--text-size-1); /* Adjust font size */
        } 
        #button-container {
            width: 100%;
            margin-top: 6%;
            justify-content: center;
        }
        #banner-container {
            width: 100%;
            margin-top: 8%;
        }


        #banner {
            height: 10vh;
        }
        #profile-pic {
        width: 50%;
        }
        .right {
        justify-content: flex-end;
        margin-right: 1%;
        }
        .left {
            justify-content: flex-start;
            margin-left: 1%;
        }
    }
</style>
