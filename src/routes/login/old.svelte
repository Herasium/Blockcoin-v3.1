<script>
    import bc from "$lib/img/logo_blank.svg"
    import login_button from "$lib/img/login_button.svg"
    import { onMount } from 'svelte';
    import { short_error } from "$lib/errors"

    let username
    let password
    let error

    onMount(() => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      error = urlParams.get('error')
    })
</script>



<div class="container">
    <img src="{bc}" alt="A white version of the blockcoin logo." />
    <div class="text">Write, Post, Earn.</div>
</div>
<form class="container-2" method="post">
    <div class="text small">Login</div>
    {#if error!=undefined}
    <div class="text small">Error: {short_error(error)}</div>
    {/if}
      <div class="form">
          <span class="material-symbols-outlined">account_circle</span>
          <input placeholder="Username" id="username" name="username" type="text" bind:value={username} required/>
      </div>
      <div class="form">
          <span class="material-symbols-outlined">password</span>
          <input placeholder="Password" id="password" name="password" type="password" bind:value={password} required/>
      </div>
      <button type="submit"  id="Login-button" >
        <img src="{login_button}" alt="The login button" id="Login-img" />
      </button>
    <a id="Register" href="/register">Or Register</a>
    
</form>

<style>
    .text {
        font-family: var(--text-font);
        font-weight: var(--text-weight-bold);
        font-size: var(--text-size-4);
        color: var(--text-color);
      }
      
      
      .small {
        font-size: var(--text-size-2);
        font-weight: var(--text-weight-thin);
      }
      
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        top:0;
        left:0;
        height: 100%;
        width: 50%;
        position: absolute;
        z-index: 4;
        gap: 10px;
      }
      
      .container-2 {
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        top:0;
        right:0;
        height: 100%;
        width: 50%;
        position: absolute;
        z-index: 4;
      }
      .form {
        width: 375px;
        height: 55px;
        border-bottom: 1px solid white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .form span{
        color: var(--text-color);
        font-size: var(--text-size-3);
      }
      
      .form input{
        background: none;
        text-align: right;
        color: var(--text-color);
        height: 100%;
        border: none;
        font-size: var(--text-size-1);
        width: 80%;
      }
      
      .form input:focus {
        outline:none!important;
      }
      
      ::placeholder {
        color: var(--text-color);
      }
    
      
      #Login-img {
        width: 100%;
        height: 100%;
      }

      #Login-button {
        cursor: pointer;
        margin-top: 30px;
        color: none;
        background: none;
        border: none;
        width: 330px;
        height: 53px;
      }
      
      #Register {
        cursor: pointer;
        background: none;
        border: none;
        font-family: var(--text-font);
        font-weight: var(--text-weight-thin);
        color:var(--text-color);
        font-size: var(--text-size-2);
        margin-top: 5px;
      }
      @media screen and (max-width: 1270px){
        .container {
          display: none;
          width: 100%; 
          height: 100%;
        }
        .container-2 {
          width:100%;
        }
      }
      
      @media screen and (max-width: 550px){
        .form {
          width: 75%;
        }
        #Login-button {
          width: 65%;
        }
      }
</style>