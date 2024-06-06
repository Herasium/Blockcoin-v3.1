<script>
    // @ts-nocheck
    
        import bc from "$lib/img/logo_blank.svg"
        import SvelteMarkdown from 'svelte-markdown'
    
        export let post
        
        function formatDate(unixTimestamp) {
            const date = new Date(unixTimestamp * 1000);
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit'
            };
            return date.toLocaleDateString('en-EN', options);
        }
        const source = post["data"]["data"]
        const badges = [
                "award_star", "verified", "shield_person", "smart_toy", "local_fire_department", "science", 'bug_report'
            ]
        const titles = [
                "BlockCoin Admin", "Verified Account", "BlockCoin Staff", "Bot Account", "BlockCoin Premium", "Beta Tester", "Bug Report"
        ]
    </script>
    
    
    <div id="post" class="post">
        <div id="top-container">
            <a href="/profile/{post["buyer"] ? post["buyer"]["id"] : post["profile"]["id"]}">
                <img id="post-img" class="profile-picture text" alt="User's profile picture." src={post["buyer"] ? post["buyer"]["profile-picture"] : post["profile"]["profile-picture"]}/>
            </a>
            {#if post["buyer"]!=undefined}
                <a id="post-user" class="text username">{post["buyer"]["display"]}</a>
            {:else}
                <a id="post-user" class="text username" href="/profile/{post["profile"]["id"]}">{post["profile"]["display"]}</a>
            {/if}
            <div class="post-badges-container">
                {#if post["buyer"]!=undefined}
                    {#each post["buyer"]["badges"] as badge}
                        <span class="post-badge material-symbols-outlined" title="{titles[badge]}">{badges[badge]}</span>
                    {/each}
                {:else}
                    {#each post["profile"]["badges"] as badge}
                        <span class="post-badge material-symbols-outlined" title="{titles[badge]}">{badges[badge]}</span>
                    {/each}
                {/if}
            </div>
        </div>
        <div id="post-data" class="text data"><SvelteMarkdown {source} /></div>
        <div id="post-meta" class="text timestamp" >BlockCoin Browser App - {formatDate(post["data"]["date"])}</div>
        <div id="post-stats" class="stats text">
            <span class="material-symbols-outlined">visibility</span> 
            <span class="views">{post["data"]["views"]}</span> 
            <span class="material-symbols-outlined like-button">favorite</span> 
            <span class="likes">{post["data"]["likes"]}</span> 
            <span class="material-symbols-outlined comment-button">chat</span> 
            <span class="comment">{post["data"]["comments_number"]}</span> 
            {#if post["data"]["isBuyable"]}
                <img src={bc} class="a-blockcoin" alt="The blockcoin currency!"/> 
                <span class="blockcoin">{post["data"]["price"]}</span> 
            {/if}
        </div>
    </div>
    
