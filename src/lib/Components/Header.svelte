
<script lang="ts">

    import { goto } from "$app/navigation";
export function navigateToCrypto() {
		goto('/crypto');  // Navigate to Cryptocurrency Details page
	}

export function navigateTOAPI() {
    goto('/TESTAPI');
}
</script>


<h1>Here is the place showing the currency rate in real-time</h1>