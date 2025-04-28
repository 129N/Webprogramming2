
<script lang="ts">
   


    interface CryptoHistoryItem{
        close:number ;
        time: number;
    }

    interface CryptoHistoryResponse {
    Data: {
        Data: CryptoHistoryItem[];
    };
}

    const API_KEY = 'a578648129e95782763813607f46ed281f8f6e06ad1ebe5b9bddcdd5b5d02fd6';

    import { scale } from './scale.js';


    //let ETHData: number[] = [];
    //let Data: number[] = [];
    let loading =$state(true);          // Starts true (initial loading)
    let error: string | null = $state(null);
    let BTCData = $state<number[]>([]);
    let timestamp = $state<string[]> ([]); 
    let w = $state(800);
    let h = $state(500);

    // Derived values
    const min = $derived(BTCData.length ? Math.min(...BTCData) * 0.98 : 0);
    const max = $derived(BTCData.length ? Math.max(...BTCData) * 1.02 : 100000); 

    const x = $derived(scale([0, Math.max(1, BTCData.length - 1)], [0, w]));
    const y = $derived(scale([min, max], [h, 0]));


    // Generate ticks
    const ticks = $derived.by(() => {
        const range = max - min;
        const step = 
        range > 50000 ? 10000 :
            range > 10000 ? 5000 :
            range > 5000 ? 1000 :
            500; // Auto-adjust based on price range
        const result: number[] = [];
        let n = step * Math.ceil(min / step); // Adjusted for BTC prices
        while (n < max) {
            result.push(n);
            n += step;
        }
        return result;
    });

    
    // Fetching data 14 days

    const fetchHistory = async (): Promise<void> => {
            try{
                const res = await fetch(
                `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=14&api_key=${API_KEY}`
            );
              
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

            const json = await res.json() as CryptoHistoryResponse;

            BTCData = json.Data.Data.map((item:CryptoHistoryItem) => item.close);
            timestamp = json.Data.Data.map((item:CryptoHistoryItem) => 
                new Date(item.time * 1000).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                })
            );
            } catch(err){
                console.error('Historical data error:', err);
            }
        };


        
		const fethBTC = async () => {
			try {
                loading = true;
				const res = await fetch(
					`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=${API_KEY}`
				);
                    if (!res.ok) throw new Error('API request failed');

				const json = await res.json();
				const btc = json.USD ?? 0;
				BTCData = [...BTCData.slice(-15), btc];
                error = null;
			} catch (err) {
				error = err instanceof Error ? err.message : 'Unknown error';
                console.error('API Error:', err);
			} finally {
        loading = false;  
                    }
		};


           // Update with current price periodically
           const updateCurrentPrice = async () => {
                const price = await fethBTC();
                BTCData = [...BTCData.slice(-14), price] as number[]; // Maintain 15 data points
                timestamp = [...timestamp.slice(-14), new Date().toLocaleDateString()];
	        } ;
            

		//fethBTC(); // fetch once immediately
		


    $effect(  () => 
    {   
        let interval: NodeJS.Timeout;
   
            const Execution = async () => {
            try{
                loading = true;
       
                //fetch the hisotry 
                await fetchHistory();

                await updateCurrentPrice();

                // Set up periodic updates
                interval = setInterval(fethBTC, 60000);
            } catch(err){
            error = err instanceof Error ? err.message : 'Unknown error';
            } finally {
            loading = false;
        }
        };

        Execution();

        return () => {
            if(interval) clearInterval(interval);
        };
    });

    const formatPrice = (price: number): string => {
    if (price >= 1000000) {
        return `$${(price/1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
        return `$${(price/1000).toFixed(1)}K`;
    }
    return `$${price.toFixed(0)}`;
};
</script>

<h2>Bitcoin Price Chart</h2>
{#if error}
    <div class="error">{error}</div>
{:else if loading}
    <div class="loading">Loading data...</div>

{:else}
    <!-- Show chart -->
    <div class="outer">
        <svg width= {w} height= {h}>
             <!-- X-axis base line -->
            <line y1={h} y2={h} x2={w} stroke="#ccc"  stroke-width="1" />
    
            <!-- Y-axis grid ticks -->
           {#each ticks as tick}
                <g class="tick" transform="translate(0,{y(tick)})">
                    <line x2={w} stroke="#eee"stroke-dasharray="2,2"  />
                    <text x={-10} dy="0.32em" text-anchor="end" font-size="12"  fill="#666"   font-family="sans-serif">
                        <!-- ${(tick/1000).toFixed(0)}k -->

                        {formatPrice(tick)}
                    </text>
                </g>
            {/each}
                

            <!-- X-axis date labels --> 
            {#each BTCData as _, i}

                {#if i % 2===0} <!-- Show every other date to prevent crowding -->
                <text x={x(i)} y={h - 5} text-anchor="middle"font-size="10" fill="#666">
                {timestamp[i]}
                </text>
                <line x1={x(i)} x2={x(i)} y1={h} y2={h - 5} stroke="#ccc" stroke-width="1"/>

                {/if}
            {/each}

            <!-- BTC Polyline (Price line) -->
                <polyline
                points={BTCData.map((d, i) => `${x(i)},${y(d)}`).join(' ')}
                stroke="#f7931a"
                stroke-width="2"
                fill="none"
                stroke-linejoin="round"
                stroke-linecap="round"
                /> 
            <!-- Current Price Indicator -->
    
            {#if BTCData.length > 0}
            <circle 
                cx={x(BTCData.length-1)}
                cy={y(BTCData[BTCData.length - 1])} 
                r="6" 
                fill="#f7931a" 
            />
    
            <text
            x={x(BTCData.length - 1) + 10} 
            y={y(BTCData[BTCData.length - 1]) - 10} 
            font-size="12"
            fill="#f7931a"
            font-weight="bold">
                ${BTCData[BTCData.length - 1].toFixed(2)}
            </text>
            {/if}
        
            <text x={10} y={30} font-size={18}>BTC/USD Price</text>
    
        </svg>
        
    
    </div>
{/if}



<!--
<h3>BTC: {BTCPrice}</h3>
<h3>ETH : {ETHprice}</h3>
-->



    <style>
    
        .outer {
            width: 100%;
            height: auto;
            padding: 2em;
            box-sizing: border-box;
        }
    
        svg {
            overflow: visible;
            shape-rendering: crispEdges;
            width: 100%;
            height: auto;
            overflow: visible;
        }
    
        polyline {
            fill: none;
            stroke: #ff3e00;
            stroke-width: 2;
            stroke-linejoin: round;
            stroke-linecap: round;
        }

        
    line {
		stroke: #aaa;
        stroke-dasharray: 2,2;
	}

	.tick {
		stroke-dasharray: 2 2;

		text {
			text-anchor: end;
			dominant-baseline: middle;
		}
	}
    </style>
