<script>
    export let data;
    import bc_logo from "$lib/img/logo.png";

    let newpass;
    const searchParams = new URLSearchParams(window.location.search);

    function form_send(e) {
        const formData = new FormData()
        console.log(formData.values())
        formData.append("password",newpass)
        formData.append("token",searchParams.get('token'));
        console.log(formData.values())
    }
</script>

<div class="center">
    <form class="entry" on:submit|preventDefault={form_send}>
        <img class="logo" src={bc_logo} alt="Blockcoin's Logo">
        <label>New Password</label>
        <input placeholder="New Password" id="password" class="newpass" type="password" name="password" bind:value={newpass} minlength="8" maxlength="32" required/>
        <button class="submit" type="submit" >Reset</button>
    </form>
</div>

<style>
    :global(body) {
        margin: 0;
    }

    .center {
        display: grid;
        place-content: center;
        width: 100%;
        height: 100vh;
    }

    .entry {
        width: 280px;
        height: 330px;
        padding: 2.5em;
        border: var(--global-border);
        border-radius: var(--global-border-radius-1);
        text-align: center;
    }

    .newpass, .submit {
        width: 100%;
        height: 50px;
        border: var(--global-border);
        border-radius: var(--global-border-radius-1);
        padding: 5px;
        margin: 0;
        background: none;
        color: white;
        font-size: 20px;
        margin-bottom: 10px;
        font-family: var(--text-font), sans-serif;
    }

    label {
        font-family: var(--text-font), sans-serif;
        font-weight: var(--text-weight-normal);
        color: white;
        display: inline-block;
        font-size: var(--text-size-2);
        text-align: left;
        width: 100%;
        margin-bottom: 5px;
    }

    .newpass {
        width: calc(100% - 10px);
        height: 40px;
    }

    .submit {
        cursor: pointer;
    }

    .newpass:focus {
        outline: none;
    }

    .logo {
        margin-bottom: 50px;
    }
</style>