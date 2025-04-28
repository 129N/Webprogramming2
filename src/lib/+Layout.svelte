
<script lang="ts">
    import SIdebar from "./Components/SIdebar.svelte";
    
    let sidebarOpen = false;
    
    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }
</script>

<div class="app-container">
    <SIdebar bind:open={sidebarOpen} />
    

</div>

<style>
    .app-container {
        display: flex;
        min-height: 100vh;
    }
    
    .main-content {
        flex-grow: 1;
        transition: margin-left 0.3s ease;
        margin-left: 0;
    }
    
    .main-content.sidebar-open {
        margin-left: 250px;
    }
</style>