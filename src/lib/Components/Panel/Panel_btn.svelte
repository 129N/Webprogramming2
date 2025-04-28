<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import Icon from "@iconify/svelte";

    
    export function navigateToCrypto() {
		goto('/crypto');  // Navigate to Cryptocurrency Details page
	}

export function navigateTOAPI() {
    goto('/TESTAPI');
}

export function navigateTOHome() {
  goto('/');
}
let selectedOption: 'Crypt' | 'Portfolio' | 'Home' = null;

function handleSelection(option: 'Crypt' | 'Portfolio' | 'Home') {
    selectedOption = option;
    if (option === 'Crypt') goto('/BTCPAGE');
    else if(option==='Portfolio')goto('/ETHPAGE');
    else if(option==='Home')goto('/');
  }
</script>


<div class="content-area">

 


    <div class="panels">
        <h1>Three main section</h1>
    
        <div class="radios">
            <label >
                <input type="radio" name="view-mode" 
                checked = {selectedOption === 'Crypt'}
                on:change={() => handleSelection('Crypt')}/>
                <div class="radio-box Crypt" class:selected={selectedOption === 'Crypt'}>
                    <span>
                    <Icon icon="icon-park-solid:finance" width="30px" height="30px"  style="color: #000" /> <br>
                    Bitcoin page</span>
                </div>
            </label>

            <label>
                <input type="radio" name="view-mode" 
                checked = {selectedOption === 'Portfolio'}
                on:change={() => handleSelection('Portfolio')}/>
                <div class="radio-box Portfolio" class:selected={selectedOption === 'Portfolio'}>
                  <span>
                    <Icon icon="arcticons:finance" width="30px" height="30px"  style="color: #007e90" /> <br>
                   ETH page</span>
                </div>
            </label>

            <label>
              <input type="radio" name="view-mode"
              checked = {selectedOption === 'Home'}
              on:change={() => handleSelection('Home')}/>
              <div class="radio-box Home" class:selected={selectedOption === 'Home'}>
                <span>
                  <Icon icon="material-symbols:home-rounded" width="30px" height="30px"  style="color: #007e90" /> <br>
                  Home</span>
              </div>
            </label>
        </div>
    </div>

</div>


<style>
    /* removes the button*/
    input[type="radio"]{ 
        display: none;
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


    .radio-box.selected.Crypt {
    transform: translateY(-20px);
    background-color: #007e90;
    color: white;
  }

  .radio-box.selected.Portfolio {
    transform: translateY(-20px);
    background-color: #007e90;
    color: white;
  }
  .radio-box.radio-box.selected.Home{
    transform: translateY(-20px);
    background-color: #007e90;
    color: white;
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
    padding-bottom: -50px;
  }

  .radio-box.Portfolio span {
    color: #007e90;
    padding-bottom: -50px;
  }

  .radio-box.Home{
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
