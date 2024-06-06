<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import bc_logo from "$lib/img/logo.png";
    import { short_error } from "$lib/errors"
    let enteredCode = ['', '', '', '', '', ''];

    function handleInput(index, event) {
      let { value } = event.target;
      if (value.length === 1 && /^[0-9]$/.test(event.key)) {
        enteredCode[index] = value;
        const nextIndex = index < 5 ? index + 1 : index;
        const nextInput = document.querySelector(`#code-${nextIndex}`);
        if (nextInput) {
          nextInput.focus();
        }
      } else if (value === '' && index > 0 && event.key == "Backspace") {
        enteredCode[index] = '';
        const prevIndex = index - 1;
        const prevInput = document.querySelector(`#code-${prevIndex}`);
        if (prevInput) {
          prevInput.focus();
        }
      } else {
        event.value = ""
      }
    }
  
    function handleNumber(index,event) {
        if (/^[0-9]$/.test(event.target.value) == false) {
            event.target.value = ""
        } else {
          if (index == 5) {
            var path = window.location.pathname;
            var pathArray = path.split('/');
            if (pathArray[0] === '') {
                  pathArray.shift();
            }
            console.log(pathArray);
            var string = enteredCode.join('');
            const response = fetch('/verify', {
              method: 'POST',
              body: JSON.stringify({ user: pathArray[1],code:string }),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(data => {
              if (data.redirected == true) {
                document.location.href = data.url
              }
            })
          }
        }
        
    }

    let error

    onMount(() => {
      const firstInput = document.querySelector('.code-input');
      if (firstInput) firstInput.focus();
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      error = urlParams.get('error')
    });
  </script>
  
  <div id="global">
    <div id="container">
      <br>
      <img alt="blockcoin's logo, again" src={bc_logo}/>
      <br>
      <div class="text big">Blockcoin Email Verification</div>
      <br>
      <div class="text">An email has been sent to you with a code.<br>Please put the given code here.</div>
      <br>
      {#if error!=undefined}
        <div class="text small">Error: {short_error(error)}</div>
      {/if}
      <br>
      <div id="code-container">
        {#each enteredCode as code, index}
          <input type="text" class="code-input" id={'code-' + index} bind:value={code} on:keydown={(event) => handleInput(index, event)} on:input={(event) => handleNumber(index, event)} maxlength="1"/>
        {/each}
      </div>
      <br>
    </div>
  </div>
  
  <style>
    #global {
      position: fixed;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    #container {
      backdrop-filter: blur(var(--navbar-blur));
      border: white solid 1px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 32px;
      height: 500px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      width: 500px;
    }
  
    .text {
      font-family: var(--text-font);
      font-weight: var(--text-weight-normal);
      font-size: var(--text-size-1);
      color: var(--text-color);
      text-align: center;
    }
  
    .big {
      font-size: var(--text-size-3); 
    }
  
    #code-container{
      height: 15%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
    }
  
    .small {
      font-size: var(--text-size-2);
      font-weight: var(--text-weight-thin);
    }

    .code-input {
      width: 12%;
      height: 100%;
      border: white solid 1px;
      background-color: rgba(255, 255, 255, 0.1);
      margin: 1%;
      text-align: center;
      font-family: var(--text-font);
      font-weight: var(--text-weight-normal);
      font-size: var(--text-size-4);
      color: var(--text-color);
      border-radius: 16px;
    }
  
    .verification-status {
      margin-top: 20px;
      font-weight: bold;
    }

    @media screen and (max-width: 550px){ 
        #container {
            backdrop-filter: none;
            border: none;
            background: none;
        }
    }
  </style>
  