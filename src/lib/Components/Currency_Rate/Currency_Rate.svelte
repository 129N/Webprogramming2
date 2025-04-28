<script lang="ts">
   

  
    interface CurrencyPair {
  symbol: string;
  price: number | string; // Can be number or string ('---'/'Error')
  type: 'fiat' | 'crypto';
  previousPrice?: number;
                            }

    // Track both fiat and crypto currencies
    let currencyPairs = $state <CurrencyPair[] > ([
      { symbol: 'USD/JPY', price: '---',  type: 'fiat' },
      { symbol: 'EUR/USD', price: '---',  type: 'fiat' },
      { symbol: 'BTC/USD', price: '---', type: 'crypto' },
      { symbol: 'ETH/USD', price: '---', type: 'crypto' }
    ]);
  

    //API set up 
    const API_KEY = "cur_live_NLbI5tUJYR0u1hKc5Gd84vHXKyM4zWEqwhIN0Csg";
    const API_URL = "https://api.currencyapi.com/v3/latest";
    //let fetchtime = $state<Date | null>(null);

  
    async function fetchCurrencyData() {
    try {
          

      //API set up 
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&base_currency=USD`);
        const data = await response.json(); //Parse the json response 
        //fetchtime = new Date();


        // Check if fetched data
        if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
        }



        //map: makes a new array without modifying its original
          currencyPairs = currencyPairs.map(pair => { //pair is the parameter 
              const currencyCode = pair.symbol.split('/')[1]; // each pair is a CurrencyPair object
              const currencyData = data.data[currencyCode];
            
            if (!currencyData) return pair;
            
            const newPrice = parseFloat(currencyData.value);
            let change = 0;
         
            
                // Calculate change if we have previous numeric price
                if (typeof pair.price === 'number') {
                change = newPrice - pair.price;
                
                } else if (pair.previousPrice) {
                change = newPrice - pair.previousPrice;
                
                }

            return {
                ...pair,
                price: newPrice,
                previousPrice: typeof pair.price === 'number' ? pair.price : newPrice,
            
            };
      });

    } catch (error) {
      console.error('Error fetching currency data:', error);
      currencyPairs = currencyPairs.map(pair => ({
        ...pair,
        price: 'Error',
        percentChange: '---'
      }));
    }
  }
  
    $effect(() => {
      fetchCurrencyData();
      const interval = setInterval(fetchCurrencyData, 300000); // 5 minutes
      return () => clearInterval(interval);
    });
  </script>
  
  <div class="currency-section">
    <div class="container">
      {#each currencyPairs as pair}
        <div class="item {pair.type}">
          <span class="symbol">{pair.symbol}</span>
          <span class="price">
            {typeof pair.price === 'number' ? 
              pair.price.toFixed(pair.type === 'crypto' ? 6 : 4) : 
              pair.price}
          </span>
        </div>
      {/each}
    </div>
  </div>
  
  <style>
    .currency-section {
      width: 100%;
      overflow: hidden;
      position: relative;
      background: linear-gradient(90deg, #2c3e50, #4ca1af);
      color: white;
      padding: 12px 0;
      border-radius: 8px;
      margin: 10px 0;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
  
    .container {
      display: inline-flex;
      gap: 30px;
      padding: 0 20px;
      animation: ticker-scroll 30s linear infinite;
      padding: 0 20px;
    }
  
    .container::-webkit-scrollbar {
      display: none;
    }
  
    .item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      white-space: nowrap;
      background: rgba(255,255,255,0.1);
      border-radius: 20px;
      min-width: 180px;
      flex-shrink: 0;
    }
  
    .item.crypto {
      border-left: 3px solid #48bb78;
    }
  
    .item.fiat {
      border-left: 3px solid #4299e1;
    }
  
    .symbol {
      font-weight: bold;
      font-size: 0.9rem;
    }
  
    .price {
      font-family: 'Roboto Mono', monospace;
      font-weight: bold;
    }
  
    .positive {
      color: #48bb78;
    }
  
    .negative {
      color: #f56565;
    }
  
   
  
    @media (max-width: 768px) {
      .container {
        gap: 15px;
      }
      .item {
        min-width: 160px;
      }
    }

    
    @keyframes ticker-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
  </style>