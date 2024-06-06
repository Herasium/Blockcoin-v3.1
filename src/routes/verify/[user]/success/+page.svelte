<script>
    import bc_logo from "$lib/img/logo.png";
</script>

<div id="global">
    <div id="container">
        <br />
        <img alt="blockcoin's logo, again" src={bc_logo} />
        <br />
        <div class="text big">Blockcoin Email Verification</div>
        <br />
        <div class="text">
            Your email has been verified! <br> Thank you for using BlockCoin !
        </div>
        <br />
        <a href="/dashboard" class="text">Home</a>
    </div>
</div>

<style>
    #global {
        position: fixed;
        top: 0;
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

    #code-container {
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

    @media screen and (max-width: 550px) {
        #container {
            backdrop-filter: none;
            border: none;
            background: none;
        }
    }
</style>
