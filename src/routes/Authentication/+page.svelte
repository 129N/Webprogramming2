<script lang="ts">

import SIdebar from "$lib/Components/SIdebar.svelte";

import { goto } from "$app/navigation";

import PanelHome from "$lib/Components/Panel/Panel_home.svelte";
import Fotter from "$lib/Components/Fotter.svelte";

import CurrencyRate from "$lib/Components/Currency_Rate/Currency_Rate.svelte";
import PanelBtn from "$lib/Components/Panel/Panel_btn.svelte";
import Icon from "@iconify/svelte";

export function navigateToCrypto() {
		goto('/crypto');  // Navigate to Cryptocurrency Details page
	}

export function navigateTOAPI() {
    goto('/TESTAPI');
}

export function NavigateToHome(){
    goto('/');
}
let sidebarOpen = false;



    let username = "";
    let password = "";
    let error = "";

    async function handleRegister() {
        const res = await fetch("/Authentication",{
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( {username, password})
        });

        if (res.ok) {
            window.location.href = "/Authentication";  // Redirect after registration
        }else {
      error = (await res.json()).error;
    }
    }


    async function handleLogin() {
        const response = await fetch("/Authentication", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if(response.ok){
            NavigateToHome();
        }else{
            error = (await response.json()).error;
        }
    }
</script>




<div class="Header ">
    <button on:click={() => sidebarOpen = true} class="menu-button">☰</button>
    <div class="header-spacer">
        <button on:click={navigateToCrypto} class="icon-button">
            <Icon 
                icon="qlementine-icons:user-16" 
                width="30px" 
                height="30px" 
                style="color: #000" 
            />
        </button>
    </div>
</div>

<div class="content-area">
    <div class="currency-rate-container">
        <CurrencyRate />
    </div>
</div>


<div class="auth-form">
    <h2>Login</h2>
    {#if error}<div class="error">{error}</div>{/if}
    
    <input type="text" bind:value={username} placeholder="Username">
    <input type="password" bind:value={password} placeholder="Password">
    <button on:click={handleLogin}>Login</button>
    
    <div class="button-group">
        
        <button on:click={handleRegister}>Register</button>
      </div>
    
</div>




<div class="Sidebar-left_side"  role="complementary"
aria-label="Main menu"
id="sidebar">
    <SIdebar bind:open={sidebarOpen}/>
</div>
<Fotter/>


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


    .auth-form {
        max-width: 300px;
        margin: 2rem auto;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .error { color: red; margin-bottom: 1rem; }

  
   
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
    



</style>