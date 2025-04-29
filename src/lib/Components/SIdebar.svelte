<script lang="ts">
    import Icon from  '@iconify/svelte';
    import { goto } from '$app/navigation';
    export let open = false;
  
    
    const menuItems = [
        { name: "Home", icon:  "mdi:home",  path: "/"  },
        { name: "Bitcoin Page",  icon: "mdi:bitcoin",  path: "/BTCPAGE" },
        { name: "Eth Page", icon:"mdi:finance", path: "/ETHPAGE" },
        { name: "News", icon:  "mdi:newspaper", path: "/"},
        { name: "Currencies", icon:  "mdi:currency-usd", path: "/"}
    ];

     // Navigation function
     const navigate = (path: string) => {
        goto(path);
        open = false; // Close sidebar after navigation
    };
</script>


<div class="sidebar" class:open  >

    <div class="sidebar-content">
        <h2 class="sidebar-title">Menu</h2>
        <ul class="menu-list">
            <button on:click={() => open = false} class="sidebar-close">☰</button>
            {#each menuItems as item}
                <li class="menu-item">

                    <button 
                    type="button" 
                    class="menu-button"
                    on:click={() => navigate(item.path)}
                    on:keydown={(e) => e.key === 'Enter' && navigate(item.path)}
                    >

                    <Icon icon={item.icon} class="Iconifies" />
                    <span class="text">{item.name}</span>
                </li>
            {/each}
        </ul>
    </div>

    


</div>


<style>
    .sidebar{
        position: fixed;
        top: 0;
        left: -250px;
        width: 250px;
        height: 100vh;
        background-color: #2c3e50;
        color: white;
        transition: left 0.3s ease;
        z-index: 1000;
    }

    .sidebar.open{
        left: 0;
    }

   
    .sidebar-close {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1001;
    }

    .sidebar-close:hover{
        background: rgba(255, 255, 255, 0.411);
    }
   

    .sidebar-content{
        padding: 20px;
    }
    .sidebar-title {
        margin-bottom: 20px;
        font-size: 1.5rem;
        border-bottom: 1px solid #34495e;
        padding-bottom: 10px;
    }
    
    .menu-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .menu-item {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        padding: 12px 0;
        transition: background-color 0.2s;
    }
    
    .menu-item:hover {
        background-color: #99acc0;
    }
    
  

    
    .text {
        font-size: 1rem;
    }
</style>