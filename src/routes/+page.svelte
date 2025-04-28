<script lang="ts">


//import { Page } from "@sveltejs/kit";

import SIdebar from "$lib/Components/SIdebar.svelte";

import { goto } from "$app/navigation";


import Fotter from "$lib/Components/Fotter.svelte";
import Header from "$lib/Components/Header.svelte";
import CurrencyRate from "$lib/Components/Currency_Rate/Currency_Rate.svelte";
import PanelBtn from "$lib/Components/Panel/Panel_btn.svelte";
import Icon from "@iconify/svelte";

export function navigateToCrypto() {
		goto('/BTCPAGE');  // Navigate to Cryptocurrency Details page
	}

export function navigateTOAPI() {
    goto('/ETHPAGE');
}

export function navigateToAuth(){
    goto('/Authentication');
}
let sidebarOpen = false;


let selectedOption: 'Frontend' | 'backend' = 'Frontend';

// function handleSelection(option: 'Frontend' | 'backend') {
//     selectedOption = option;
//     if (option === 'Frontend') navigateToCrypto();
//     else if(option==='backend') navigateTOAPI();

//   }


    let username = "";
    let password = "";
    let error = "";



</script>


<h1> Before login version</h1>


<div class="Header ">
    <button on:click={() => sidebarOpen = true} class="menu-button">☰</button>
    <div class="header-spacer">
        <button on:click={navigateToAuth} class="icon-button">
            <Icon 
                icon="qlementine-icons:user-16" 
                width="30px" 
                height="30px" 
                style="color: #000" 
            />
        </button>
    </div>
</div>


<Header/>

<div class="content-area">
    <div class="currency-rate-container">
        <CurrencyRate />
    </div>
</div>


<main class="main-container"   >


    <div class="Sidebar-left_side"  role="complementary"
    aria-label="Main menu"
    id="sidebar">
        <SIdebar bind:open={sidebarOpen}/>
    </div>

   
   
        <PanelBtn/>
        <Fotter/>





</main>

<style>
    .Header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background-color: #f8f9fa;
        position: relative;
        z-index: 1000;
    }
    .header-spacer:hover{
        background: rgba(116, 114, 114, 0.267);
    }
    .main-container{
        display: flex;
        position: relative;
        min-height: 100vh;
        background-color: 	#424549;
    }
    .Sidebar-left_side{
        display: flex;
        min-height: 100vh;
    }

    .menu-button{
        position: flex;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: rgb(0, 0, 0);
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1001;
    }
    .menu-button:hover{
        background: rgba(116, 114, 114, 0.267);
    }.content-area {
        flex: 1;
        padding: 20px;
        margin-left: 0;
        transition: margin-left 0.3s ease;
    }
    
    .currency-rate-container {
        margin-top: 20px;
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }




    
</style>