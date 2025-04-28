<script lang="ts">
    import { goto } from "$app/navigation";
    import Icon from "@iconify/svelte";
    export function navigateToCrypto() {
		goto('/crypto');  // Navigate to Cryptocurrency Details page
	}

export function navigateTOAPI() {
    goto('/TESTAPI');
}
let selectedOption: 'Crypt' | 'Portfolio' = 'Crypt';

function handleSelection(option: 'Crypt' | 'Portfolio') {
    selectedOption = option;
    if (option === 'Crypt') navigateToCrypto();
    else if(option==='Portfolio') navigateTOAPI();

  }
</script>


<div class="content-area">

    <div class=""  role="navigation" aria-label="Quick links">
       
        <button  on:click={navigateToCrypto} >Crypto</button>
        <button  on:click={navigateTOAPI} >API</button>
    
    </div>


    <div class="panels">
        <h1>Three main section</h1>
    
        <div class="radios">
            <label >
                <input type="radio" name="view-mode" 
                checked = {selectedOption === 'Crypt'}
                on:change={() => handleSelection('Crypt')}/>
                <div class="radio-box Crypt">
                    <span>
                    <Icon icon="icon-park-solid:finance" width="30px" height="30px"  style="color: #000" /> <br>
                    Crypto page</span>
                </div>
            </label>

            <label>
                <input type="radio" name="view-mode" 
                checked = {selectedOption === 'Portfolio'}
                on:change={() => handleSelection('Portfolio')}/>
                <div class="radio-box Portfolio">
                 
                  <span>
                    <Icon icon="arcticons:finance" width="30px" height="30px"  style="color: #007e90" /> <br>
                    Portfolio</span>
                </div>
            </label>
        </div>
    </div>

</div>


<style>
    

    .panels{
        width: 100%;
        position: absolute;
        text-align: center;
        margin: 2rem 0;
    }

    .panels h1{
        font-family: "Inter", sans-serif;
        color: white;
        margin-bottom: 2rem;
    }
    .radios{
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
    }
/* removes the button*/
    input[type="radio"]{ 
        display: none;
    }

    

  input[type="radio"]:checked + .radio-box span:before {
    transform: translateY(0px);
    opacity: 1;
  }

    .radio-box {
    width: 200px;
    height: 200px;
    background-color: rgb(255, 255, 255);
    transition: all 250ms ease;
    will-change: transition;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    position: relative;
    font-family: font;
    font-weight: 900;
    border-radius: 8px;

    &:active {
      transform: translateY(-10px);
    }

    &:hover {


      transform: translateY(-10px);
    }
}



.radio-box span {
    position: absolute;
    transform: translate(0, 60px);
    left: 0;
    right: 0;
    transition: all 300ms ease;
    font-size: 1.5em;
    user-select: none;


  }

  .radio-box.Crypt span {
    color: #007e90;
  }

  .radio-box.Portfolio span {
    color: #007e90;
    padding-bottom: -50px;
  }

  .radio-box span:before {
    font-size: 1.2em;
    display: block;
    transform: translateY(-80px);
    opacity: 0;
    transition: all 300ms ease-in-out;
    font-weight: normal;
    color: rgb(173, 173, 173);
  }


</style>
