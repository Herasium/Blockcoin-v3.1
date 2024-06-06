<script>
  export let nav
  import bc_logo from "$lib/img/logo.png"
</script>

<div id="navbar" />
  <img
      src={bc_logo}
      id="logo"
      alt="Blockcoin's logo, in the form of a coin."
      on:click={()=>{window.location.href = "/"}}
  />
{#if nav.logged}
  <div class="container-3">
    <a class="trans-button" id="register" href="/feed">Feed</a>
    <a class="trans-button" id="login" href="/trending">Trending</a>
    <a class="trans-button" id="explore" href="/explore">Explore</a>
  </div>
{:else}
  <div class="container-3">
      <a class="trans-button" id="register" href="/register">Register</a>
      <a class="trans-button" id="login" href="/login">Login</a>
      <a class="trans-button" id="explore" href="/trending">Trending</a>
  </div>
{/if}



{#if nav.logged}
  <img
      src={nav.profile["profile-picture"]}
      id="profile"
      class="logged"
      alt="User's profile"
      on:click={()=>{window.location.href = "/dashboard"}}
  />
{/if}

<style>
        #navbar {
          backdrop-filter: blur(var(--navbar-blur));
          z-index:100;
          position: fixed;
          top:0;
          left:0;
          width:100%;
          height:7.5%;
          background:var(--navbar-background);
          border: var(--navbar-border);
          border-radius: var(--navbar-border-radius);
        }
        
        #logo {
          margin-left:2.5%;
          width: auto;
          height: var(--picture-size);
          display:block;
          cursor:pointer;
          object-fit: cover;
          z-index:100;
          position: fixed;
          top:0;
          left:0;
          height:5%;
          margin-top: 0.5%;
        }
        
        #profile {
          border-radius:256px;
          object-fit: cover;
          margin-right:2.5%;
          position:relative;
          width: auto;
          height: var(--picture-size);
          display:block;
          cursor:pointer;
          z-index:100;
          position: fixed;
          top:0;
          right:0;
          height:5%;
          margin-top: 0.5%;
        }

        .trans-button {
          position:relative;
          cursor:pointer;
          color: var(--text-color);
          font-family: var(--text-font);
          font-size: var(--text-size-2);
          font-weight: var(--text-weight-normal);
          z-index:100;
        }
        .container-3 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap:30px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top:0;
          left:0;
          width:100%;
          height:7.5%;
          z-index: 100;
        }
      
        @media screen and (max-width: 550px){
        .container-3 {
          display: flex;
          justify-content: space;
          align-items: center;
          gap:30px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top:92.5%;
          left:0;
          width:100%;
          height:7.5%;
          background-color: black;
          z-index: 100;
          backdrop-filter: blur(var(--navbar-blur));
          border-radius: var(--navbar-border-radius);
          background:var(--navbar-background);
          border: var(--navbar-border);
        }
        .trans-button {
          position:relative;
          cursor:pointer;
          color: var(--text-color);
          font-family: var(--text-font);
          font-size: var(--text-size-3);
          font-weight: var(--text-weight-normal);
          z-index:100;
        }
        #navbar {
          display: none;
        }
        }

</style>
