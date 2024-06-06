<script>
	import Mockup from '$lib/img/Mockup.png';
</script>

<div class="container" id="container">
	<div class="text big">Write, Post, Earn.</div>
	<div class="text small">Join us on a new social adventure today!</div>
	<div id="button">Sign-Up Now</div>
</div>
<div class="container-2" id="container-2">
	<img id="mockup" src={Mockup} alt="Blockcoin mobile app mockup." />
</div>

<style>
    .text {
        font-family: var(--text-font);
        font-weight: var(--text-weight-bold);
        font-size: var(--text-size-5);
        color: var(--text-color);
        text-align: center;
    }

      
      .small {
        font-weight: var(--text-weight-thin);
        font-size: var(--text-size-2);
      }
      
      .container {
        z-index:50;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        top:0;
        left:0;
        height: 100%;
        width: 50%;
        position: absolute;
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
      
      #button {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: var(--text-font);
        font-weight: var(--text-width-light);
        color: var(--text-color);
        font-size: var(--text-size-3);
        background: url($lib/img/border.svg);
        background-repeat: no-repeat;
        box-shadow: none;
        cursor: pointer;
        width: 370px;
        height: 70px;
        z-index:100;
      }
      #mockup {
        height: 75%;
        width: auto;
      }
    @media screen and (max-width: 1270px){
            #container {
                width: 100%; 
                height: 100%;
              }
            #container-2 {
                top: 0;
                width:100%;
                display: none;
            }
            #button {
              width: fit-content;
              height: auto ;
              background-size: cover;
              aspect-ratio: 360 / 70;
            }
          }
          

</style>
