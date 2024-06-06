<script>
    import Background from '$lib/elements/background.svelte';
    import Navbar from '$lib/elements/navbar.svelte';
    import CreatePost from "$lib/elements/create_post.svelte";
    import '$lib/style/vars.css'
    import { page } from '$app/stores'
    export let data
    const profile = data.profile
    const logged = data.logged
    const nav = {profile:profile,logged:logged}
    import Head from '$lib/elements/head.svelte';

    let type = false

    let text = "add"

    function change_text() {
        type = !type
        if (!type) {text = "add"}
        else {text = "close"}
    }
</script>

{#if $page.url.pathname != '/trending/post' && $page.url.pathname != '/explore/post' && $page.url.pathname != '/feed/post'}
    <Head />
    <Background />

    <Navbar {nav} />
    {#if type}
        <CreatePost /> 
    {/if}
    <div id="ver">Blockcoin v3.1 Beta Build, current: v3.1.19</div> 
    {#if nav.logged}
        <span class="material-symbols-outlined" id="new_button" on:click={change_text}>{text}</span>
    {/if}
{/if}

<style>
    #ver {
        position: fixed;
        bottom: 0;
        right: 0;
        font-family: var(--text-font);
        font-weight: var(--text-weight-normal);
        font-size: var(--text-size-1);
        color: var(--text-color);
    }
    #new_button {
        z-index:1000;
        width: 94px;
        height: 94px;
        border-radius:256px;
        background-color:white;
        position:fixed;
        bottom:25px;
        right:25px;
        color: black;
        text-align: center;
        vertical-align: middle;
        line-height: 94px;
        cursor:pointer;
        font-size: 72px;
        border:none;
        transition-duration: 500ms;
    }
    #new_button:hover {
        width: 100px;
        height: 100px;
        font-size: 78px;
        line-height: 100px;
    }
</style>

<slot />