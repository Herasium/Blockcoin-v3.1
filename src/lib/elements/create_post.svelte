<script>
	import { Carta, MarkdownEditor } from "carta-md";
	import { attachment } from "@cartamd/plugin-attachment";
	import { emoji } from "@cartamd/plugin-emoji";
	import { code } from "@cartamd/plugin-code";
	import DOMPurify from 'isomorphic-dompurify';

	import "$lib/style/github.scss";
	const placeholder_list = [
		"Why do I exist ?",
		"Bc on top!",
		"This is just a placeholder, you can remove it.",
		"It was fun.",
		"Lol",
		"Create your own post !",
		'Why even bother? You have a life.',
		"What is the purpose of my life?",
		"Hmm. What placeholder should this be?",
		"Eh just a placeholder for the placeholder.",
		"Found a bug, report it. We will be glad, tho you wont get paid or anything.",
		`You got this placeholder, it's a 1/17 chance!`,
		"🎉 BlockCoin is open source, we will be glad if you would like to contribute.",
		"Subscribe to BlockCoin Premium to support Hera and make him not go in debt!",
		"Here at BlockCoin Support, we don't care if you lose your blockcoins through buying a post intentonially. That's not our Job.",
		"I have no more ideas",
		"See you in 2027 for new update",
	]

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize,
		extensions: [
			attachment({
				async upload() {
					return "some-url-from-server.xyz";
				},
			}),
			emoji(),
			code(),
		],
		theme:"min-dark",
	});

	export let price = null

	export let value = placeholder_list[Math.floor(Math.random()*placeholder_list.length)];

	function check_length () {if (value.length > 500) {value = value.substring(0, 500)}}

	$: value,check_length()
</script>

<div class="bg">
	<MarkdownEditor bind:value mode="tabs" theme="github" {carta} />
	<input type="number" bind:value = {price} placeholder="Put your price here! Blank = Not to sell, 0 = Free" max=1000 min=0/>
	<div class="under">
		<div class="counter">{value.length}/500</div>
		<form method="post" action="/post">
			<input name="post" value={value} readonly style="display:none" />
			<input name="price" value={price} readonly style="display:none" />
			<button class="post" type="submit">Post!</button>
		</form>
	</div>
</div>

<style>

	input{
        background: none;
        text-align: center;
        color: var(--text-color);
        border: none !important;
		stroke: none !important;
		appearance: none;
		outline: none;
        font-size: var(--text-size-1);
        width: 561px;
		background-color: #0d1117 !important;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 64px;
		margin: 1%;
		height: 3%;
    }

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.under {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		width: 561px;
	}
	.post {
        cursor: pointer;
        margin-top: 10px;
        color: var(--text-color);
        font-size: var(--text-size-1);
        font-weight: var(--text-weight-normal);
        background: #B803FF;
        border-radius: 256px;
        border: none;
        width: 200px;
        height: 53px;
      }
	.bg {
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		position: fixed;
		background-color: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(30px);
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	* {
		font-family: var(--text-font);
		color: white; /* General text color */
		border:none;
	}




</style>
