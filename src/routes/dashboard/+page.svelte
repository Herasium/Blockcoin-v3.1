<script>
    export let data;

    import bc from "$lib/img/logo_blank.svg"
    import { onMount } from "svelte"
</script>

<div id="big-container">
    <div id="container">
      <div id="cont-1" class="container">
        <div id="cont-1-5">
          <img id="dash-profile-picture" src={data.dashboard.user["profile-picture"]}/>
          <div id="welcome"> Welcome back {data.dashboard.user["user"] || "Loading"}.</div>
        </div>
        <div id="cont-1-8">
          <div id="balance">Balance: {data.dashboard.user["balance"]}</div> 
          <img src={bc} alt="A white version of the blockcoin logo." id="currency"/>
        </div>
      </div>
      <div id="cont-4" class="container">
        <div class="title qlt">Quick Links:</div>  
        <div id="links-container">
          <div class="link" on:click={()=>{window.location.href = "/settings"}}><p>Settings</p></div>
          <div class="link" on:click={()=>{window.location.href = "/profile/" + data.dashboard.user["id"]}}><p>Profile</p></div>
          <div class="link" on:click={()=>{window.location.href = "/economy"}}><p>Economy</p></div>
        </div>
      </div>
    </div>
      <div id="cont-2" class="container">
        <div id="stats" class="title">Stats</div>
        <div id="stats-container">
          <div class="stat"><span class="material-symbols-outlined" id="icon-1">favorite</span> <span>{data.dashboard.stats["likes"]}</span> </div>
          <div class="stat"><span class="material-symbols-outlined" id="icon-2">visibility</span> <span>{data.dashboard.stats["views"]}</span> </div>
          <div class="stat"><span class="material-symbols-outlined" id="icon-3">person</span> <span>{data.dashboard.stats["followers"]}</span> </div>
        </div>
      </div>
      <div id="cont-3" class="container">
        <div class="title">Leaderboards</div>
        <div id="lb-container">
          <div class="lb-sub-cont">
            <div class="lb"><span id="lb-balance" class="lb-big">#0</span><br>Total Balance</div>
            <div class="lb"><span id="lb-views" class="lb-big">#0</span><br>Total Views</div>
            <div class="lb"><span id="lb-likes" class="lb-big">#0</span><br>Total Likes</div>
          </div>
          <div class="lb-sub-cont">
            <div class="lb"><span id="lb-likes" class="lb-big">#0</span><br>Total Comments</div>
            <div class="lb"><span id="lb-likes" class="lb-big">#0</span><br>Total Followers</div>
          </div>
        </div>
      </div>
</div>

<style>
    .link {
      cursor:pointer;
      border: var(--global-border);
      width: 100%;
      height: calc(33% - 10px);
      font-size: var(--text-size-3);
      color: var(--text-color);
      font-family: var(--text-font), sans-serif;
      font-weight: 400;
      text-align:center;
      border-radius: var(--global-border-radius-1);
      margin:5%;
      margin-top: 5px;
      margin-bottom: 5px;
      display: flex;
      justify-content:center;
      align-items:center;
    }
    #links-container {
      display: flex;
      flex-wrap: wrap;
      width:100%;
      height:70%;
      position:absolute;
      top:25%;
      left:0;
      justify-content:center;
      align-items:center;
    }
    #lb-container {
      display:flex;
      position:absolute;
      left:0;
      flex-direction: column;
      justify-content: center;
      width:100%;
      height: 100%;
      top: 10%;
    }
    .lb-sub-cont {
      display: flex;
      justify-content: space-evenly;
    }
    .lb {
      font-size: var(--text-size-1);
      color: var(--text-color);
      font-family: var(--text-font), sans-serif;
      font-weight: 400;
      text-align:center;
    }

    #stats {
      font-size: var(--text-size-3);
    }
    #icon-1, #icon-2, #icon-3, .lb-big {
      font-size: var(--text-size-5);
    }
    .stat {
      font-size: var(--text-size-5);
      color: var(--text-color);
      font-family: var(--text-font), sans-serif;
      font-weight: 400;
    }
    #stats-container {
      display:flex;
      justify-content:center;
      position:absolute;
      top:0;
      left:0;
      flex-direction:column;
      width:100%;
      height:70%;
      top:20%;
      align-items:center;
    }
    #welcome {
      font-family: var(--text-font), sans-serif;
      font-weight: 400;
      color: var(--text-color);
      font-size: var(--text-size-2);
      margin-left:5px;
    }
    #balance {
      font-family: var(--text-font), sans-serif;
      font-weight: 500;
      color: var(--text-color);
      font-size: var(--text-size-4);
      display:flex;
      justify-content:flex-end;
      align-items:center;
      margin-left:2.5%;
      margin-right:22px;
    }
    #cont-1-5 {
      position:absolute;
      display:flex;
      justify-content:flex-start;
      align-items:center;
      top:5%;
      left:2.5%;
      width:50%;
    }
    #cont-1-8 {
      position:absolute;
      display:flex;
      justify-content:flex-start;
      align-items:center;
      top:0;
      left:0;
      width:100%;
      height:100%;
    }
    #balance img {
      width:75px;
      height:75px;
    }
    .title {
      font-family: var(--text-font), sans-serif;
      font-weight: 400;
      color: var(--text-color);
      font-size: var(--text-size-3);
      position:absolute;
      top:5%;
      left:2.5%;
    }
    .qlt {
      text-align: center;
      width: 100%;
      left: 0;
    }
    #big-container {
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      position:absolute;
      top:0;
      left:0;
    }
    #container {
      width:80%;
      height:80%;
    }
    .container {
      border: var(--global-border);
      border-radius: var(--global-border-radius-1);
      position:absolute;
    }
    #cont-1{
      width:63.75%;
      height:39%;
      top:10%;
      left:10%;
    }

    #cont-1 img{
      width:65px;
      border-radius:256px;
      height:65px;
    }

    #cont-2{
      width:39.75%;
      height:39%;
      top:50%;
      left:10%;
    }
    #cont-3{
      width:39.75%;
      height:39%;
      right:10%;
      top:50%;
    }
    #cont-4{
      width:15.75%;
      height:39%;
      right:10%;
      top:10%;
    }
</style>