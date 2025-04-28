<script lang="ts">
console.log("Crypto Details Page Loaded");
import SIdebar from "$lib/Components/SIdebar.svelte";
import Fotter from "$lib/Components/Fotter.svelte";
import Header from "$lib/Components/Header.svelte";
import CurrencyRate from "$lib/Components/Currency_Rate/Currency_Rate.svelte";
let sidebarOpen = false;

import CryptoRate from "$lib/Components/Crypt_API/Crypto_Rate.svelte";
import Beta from "$lib/Components/Crypt_API/Beta.svelte";
</script>


<Header/>


<div class="Header ">
    <button on:click={() => sidebarOpen = true} class="menu-button">☰</button>
</div>

<div class="content-area">
    <div class="currency-rate-container">
        <CurrencyRate />
    </div>
</div>


<h1>Here is the Crypto currency eith raw state</h1>

<CryptoRate/> 
  
<!--<Beta/> -->


    <Fotter/>

   

    <div class="Sidebar-left_side"  >
        <SIdebar bind:open={sidebarOpen}/>
    </div>

<style>
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
    
</style>