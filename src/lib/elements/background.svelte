
<div id="blur" />
<div class="elipse" id="e-1" />
<div class="elipse" id="e-2" />
<div class="background" />



<style>
        .background {
            background: var(--background-data);
            width:100%;
            height:100%;
            position:fixed;
            top: 0;
            left:0;
            z-index: -7;
        }
        #blur {
            backdrop-filter: blur(var(--background-blur));
            z-index: -5;
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
        }
        
        .elipse {
            border-radius: 458px;
            width: 458px;
            height: 458px;
            z-index: -6;
            display: var(--background-elipse-display);
            position: fixed;
        }
        
        #e-1 {
            background: var(--background-elipse-1-color);
            top:0;
            left:0;
        }
        
        #e-2 {
            background: var(--background-elipse-2-color);
            bottom: 0;
            right:0;
        }
        @media screen and (max-width: 1270px){
            #blur {
              height: 100%;
            }
            .elipse {
              height: 56vw;
              width: 56vw;
            }
          }
        @media screen and (max-width: 425px){
            .elipse {
              height: 76vw;
              width: 100%;
            }
            #e-1 {
            top:0;
            left:0;
            }
            
            #e-2 {
                bottom: 0;
                right:0;
            }
        }
</style>