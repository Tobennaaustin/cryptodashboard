async function getCryptoData() {

    const coinsToDisplay = ["BTC", "ETH", "SOL", "BNB", "XRP", "DOGE"];

    const options = {
      method: "GET",
      headers: {
        "x-access-token":
          "coinranking345b374432d2e68fed91022078cf0b1a7a0c0889e7d80bda", 
      },
    };

    fetch("https://api.coinranking.com/v2/coins?limit=50", options)
      .then((res) => res.json())
      .then((data) => {
        const container = document.getElementById("crypto-container");
        container.innerHTML = "";

        const coins = data.data.coins.filter((coin) =>
          coinsToDisplay.includes(coin.symbol)
        );

        coins.forEach((coin) => {
          const change = parseFloat(coin.change);
          const price = parseFloat(coin.price);
          const logo = coin.iconUrl;

          const item = document.createElement("div");
          item.className = "crypto-item";
          item.innerHTML = `
        <div class="item-head">
            <div class="item-name">
                <img src="${logo}" alt="${coin.name} logo">
                <div class="crypto-text">
                    <h3>${coin.name}</h3>
                    <p>${coin.symbol}</p>
                </div>
            </div>
            <div class="item-icon">
                <p style="color: ${
                  change >= 0 ? "green" : "red"
                };">${change.toFixed(2)}%</p>
            </div>
        </div>
        
        <div class="item-body">
            <div class="item-text">
                <p>Latest price</p>
                <p>$${price.toFixed(2)}</p>
            </div>
            <div class="item-btn">
                <button>Buy</button>
            </div>
        </div>
      `;
          container.appendChild(item);
        });
      })
      .catch((err) => console.error("Error fetching crypto data:", err));

  
}

getCryptoData();
