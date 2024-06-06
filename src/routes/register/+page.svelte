<script>
  import { onMount } from 'svelte';
  import { short_error } from "$lib/errors"
  let error

  onMount(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    error = urlParams.get('error')
  })
</script>




<form class="container-2" method="post">
    <div class="text">Sign Up</div>
    
    {#if error!=undefined}
      <div class="text small">Error: {short_error(error)}</div>
    {:else}
      <div class="text small">Tell us a bit about yourself!</div>
    {/if}
      <div class="form">
          <input placeholder="Enter your Username." id="username" name="username" type="text" required/>
      </div>
      <div class="form">
        <input placeholder="Enter your Email." id="username" name="email" type="email" required/>
      </div>

      <button type="submit"  id="Login-button" >Continue</button>
      <a id="Sign-button" href="/login">Login</a>
</form>

<style>
    .text {
        font-family: var(--text-font);
        font-weight: var(--text-weight-thin);
        font-size: var(--text-size-4);
        color: var(--text-color);
        margin-bottom: 25px;
      }
      
      
      .small {
        font-size: var(--text-size-2);
        font-weight: var(--text-weight-thin);
      }
      
 
      
      .container-2 {
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        top:0;
        left:0;
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 4;
      }
      .form {
        margin-bottom: 20px;
        width: 550px;
        height: 55px;
        background-color: rgba(255, 255, 255, 0.2) !important;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 64px;
      }
         
      .form input{
        background: none;
        text-align: left;
        color: var(--text-color);
        height: 100%;
        border: none;
        font-size: var(--text-size-1);
        width: 90%;
      }
      
      .form input:focus {
        outline:none!important;
      }
      
      ::placeholder {
        color: var(--input-color);
      }
    
      

      #Login-button {
        cursor: pointer;
        margin-top: 10px;
        color: var(--text-color);
        font-size: var(--text-size-1);
        font-weight: var(--text-weight-thin);
        background: #B803FF;
        border-radius: 256px;
        border: none;
        width: 330px;
        height: 53px;
      }

      #Sign-button {
        cursor: pointer;
        margin-top: 20px;
        color: var(--text-color);
        font-size: var(--text-size-1);
        font-weight: var(--text-weight-thin);
        background: #061E2F;
        border-radius: 256px;
        border: none;
        width: 330px;
        height: 53px;
        background: none;
        text-align: center;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--text-font);
      }

      #Forgot-button {
        cursor: pointer;
        color: var(--text-color);
        font-size: var(--text-size-1);
        font-weight: var(--text-weight-thin);
        background: none;
        border-radius: 256px;
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