<script lang="ts">
    console.log("Crypto Details Page Loaded");
    import SIdebar from "$lib/Components/SIdebar.svelte";
    import Fotter from "$lib/Components/Fotter.svelte";
    import Header from "$lib/Components/Header.svelte";
    import PanelBtn from "$lib/Components/Panel/Panel_btn.svelte";


    import CurrencyRate from "$lib/Components/Currency_Rate/Currency_Rate.svelte";
    import Eth_Rate from "$lib/Components/Crypt_API/ETH.svelte";
    let sidebarOpen = false;
    </script>
    
    


    <h1>ETH Page</h1>
    <div class="Header ">
        <button on:click={() => sidebarOpen = true} class="menu-button">☰</button>
    </div>
    <Header/>
    
    <div class="content-area">
        <div class="currency-rate-container">
            <CurrencyRate />
        </div>
    </div>


    <h1>Here is the ETH chart</h1>
    <Eth_Rate/>

    <main class="main-container">

       
        <div class="Sidebar-left_side"  >
            <SIdebar bind:open={sidebarOpen}/>
        </div>

        <PanelBtn/>


       <h1>Here is the ETH chart</h1>
      
    </main>

    <Fotter/>

    <style>

        .main-container{
        color: white;
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
    }
    .content-area {
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