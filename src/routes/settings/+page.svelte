<script>
    export let data;
    let display = data.settings.profile["display"];
    let about = data.settings.profile["about"];
    let pfp = data.settings.profile["profile-picture"];
    let banner = data.settings.profile["banner"];
    let email = "";
    
    function pfp_changed(event) {
        const fileInput = event.target;
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = async () => {
            const fileContentBase64 = reader.result.split(',')[1];
            fetch("/settings/update",{
                method: "POST",
                body: JSON.stringify({
                    user: data.settings.profile["id"],
                    type: "profile-picture",
                    value: fileContentBase64
                }),
			    headers: {
				    'Content-Type': 'application/json'
			    }
            }).then(async response => {
                return await response.json();
            }).then(data => {
                pfp = data.data;
            })
        };

        reader.readAsDataURL(file);
    }

    function banner_changed(event) {
        const fileInput = event.target;
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = async () => {
            const fileContentBase64 = reader.result.split(',')[1];
            fetch("/settings/update",{
                method: "POST",
                body: JSON.stringify({
                    user: data.settings.profile["id"],
                    type: "banner",
                    value: fileContentBase64
                }),
			    headers: {
				    'Content-Type': 'application/json'
			    }
            }).then(async response => {
                return await response.json();
            }).then(data => {
                banner = data.data;
            })
        };

        reader.readAsDataURL(file);
    }

    function changePfp() {
        let fileInput = document.getElementById('pfp-file');
        fileInput.click();
    }
    
    function changeBanner() {
        let fileInput = document.getElementById('banner-file');
        fileInput.click();
    }

    function saveDisplay() {
        fetch("/settings/update",{
            method: "POST",
            body: JSON.stringify({
                user: data.settings.profile["id"],
                type: "display",
                value: display
            }),
			headers: {
				'Content-Type': 'application/json'
			}
        })
    }

    function saveAbout() {
        fetch("/settings/update",{
            method: "POST",
            body: JSON.stringify({
                user: data.settings.profile["id"],
                type: "about",
                value: about
            }),
			headers: {
				'Content-Type': 'application/json'
			}
        })
    }

    function saveEmail() {
        fetch("/settings/update",{
            method: "POST",
            body: JSON.stringify({
                user: data.settings.profile["id"],
                type: "email",
                value: email
            }),
			headers: {
				'Content-Type': 'application/json'
			}
        })
    }

    function logout() {
        fetch("/settings/logout",{
            method: "GET",
			headers: {
				'Content-Type': 'application/json'
			}
        }).then(() => {
            window.location.href = "/"
        })
    }

    function reset_pass() {
        fetch("/settings/reset",{
            method: "POST",
			headers: {
				'Content-Type': 'application/json'
			}
        })
    }
</script>

<div id="settings-container">
    <div id="cont-1">
        <div class="title">Profile</div>
        <div class="text-settings">
            <div class="settings-name text-name">Display Name</div>
            <input class="text-input" id="display" placeholder="Display Name" bind:value={display}/>
            <div class="settings-button" on:click={saveDisplay}>Save</div>
        </div>
        <div class="text-settings">
            <div class="settings-name text-name">About Me</div>
            <input class="text-input" id="about" placeholder="About me" bind:value={about}/>
            <div class="settings-button" on:click={saveAbout}>Save</div>
        </div>
        <div class="image-settings">
            <div class="img-txt">
                <div class="settings-name img-name">Profile Picture</div>
                <div class="settings-button" on:click={changePfp}>Change</div>
                <input type="file" id="pfp-file" on:change={pfp_changed} accept=".png,.jpg,.jpeg,.webp" style="display: none;" />
                <div class="settings-name img-name">Banner</div>
                <div class="settings-button" on:click={changeBanner}>Change</div>
                <input type="file" id="banner-file" on:change={banner_changed} accept=".png,.jpg,.jpeg,.webp" style="display: none;" />
            </div>
            <div class="img-img">
            <div class="small-img-img">
                <img class="settings-img" src={pfp} />
                
            </div>
            <div class="big-img-img">
                <img class="settings-img" src={banner} />
            </div>
        </div>
        </div>
    </div>
    <div id="cont-2">
        <div class="title">Security</div>
        <div class="text-settings">
            <div class="settings-name text-name">Email</div>
            <input class="text-input"  bind:value={email}  type="email" placeholder="you@email.bc" />
            <div class="settings-button" on:click={saveEmail}>Save</div>
        </div>
        <div class="text-settings">
            <div class="settings-name text-name">Reset Password</div>
            <div class="settings-button" id="password-change" on:click={reset_pass}>Request Password Reset</div>
        </div>
        <div class="image-settings">
            <div class="img-txt">
            <div class="settings-button" id="disconnect" on:click={logout}>Log Out</div>
            <div class="settings-button" id="delete">Delete Account</div>
        </div>
    </div>
</div>
</div>

<style>
  #delete {
      margin-bottom: 10px; /* Adjust margin */
  }
  
  #disconnect {
      margin-bottom:  10px; /* Adjust margin */
  }

  #password-change {
    width: 100%;
    margin-bottom: 30%;
  }
  
  .img-name {
      width:auto;
  }
  
  .image-settings {
      width: 90%;
      margin-top: 15px; /* Adjust margin */
  }
  
  .img-txt {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      width: 100%;
  }
  
  .small-img-img {
      overflow: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      width: 20%;
  }

  .img-img {
    overflow: auto;
    display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
    width: 100%;
  }

  .big-img-img {
      overflow: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      width: 100%;
      margin-top: 10px;
      margin-left: 10px;
    position: relative;
    height: 100%;
  }

  .settings-img {
    width: 100%;
  }
  
  .settings-button {
      cursor: pointer;
      transition-duration: 0.5s;
      font-family: var(--text-font), sans-serif;
      font-weight: var(--text-weight-normal);
      font-size: var(--text-size-2); /* Adjust font size */
      color: var(--text-color);
      border-radius: var(--global-border-radius-3); /* Adjust border radius */
      border: var(--global-border); /* Adjust border color */
      height: auto;
      width: auto;
      text-align: center;
      display: inline-block;
      padding: 5px;
  }
  
  .settings-button:hover {
      font-size: var(--text-size-3); /* Adjust font size */
  }
  
  .text-input {
      padding: 0px 3%;
      width: 94%;
      outline: none;
      background: none;
      border: var(--global-border); /* Adjust border color */
      border-radius: var(--global-border-radius-3); /* Adjust border radius */
      min-height:50px; /* Adjust min height */
      font-family: var(--text-font), sans-serif;
      font-weight: var(--text-weight-normal);
      color: var(--text-color);
      font-size: var(--text-size-3); /* Adjust font size */
      text-align: left;
      margin-bottom: 15px;
  }
  
  #settings-container {
      width: 80%;
      position: absolute;
      height: auto;
      padding-bottom: 10px;
      top: calc(15% - 10px);
      left: 10%;
      border: var(--global-border); /* Adjust border */
      display: flex;
      border-radius: var(--global-border-radius-2); /* Adjust border radius */
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: flex-start;
  }
  
  .title {
      font-family: var(--text-font), sans-serif;
      font-weight: var(--text-font);
      color: var(--text-color);
      font-size: var(--text-size-5); /* Adjust font size */
      text-align: left;
      margin-top: 25px; /* Adjust margin */
      width: 90%;
  }
  
  .text-settings {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      flex-direction: column;
      width: 90%;
  }
  
  .settings-name {
      font-family: var(--text-font), sans-serif;
      font-weight: var(--text-font);
      color: var(--text-color);
      font-size: var(--text-size-2); /* Adjust font size */
  }
  
  .text-name {
      text-align: left;
      width: 100%;
  }

  #cont-1, #cont-2 {
    width: 50%;
    margin-left: 20px;
  }
</style>