
const items = document.getElementById("products");


function onclick(event) {
    const title = event.currentTarget.childNodes[0];
    title.classList.toggle("color");
}


function newCoin(coin) {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const img = document.createElement("img");

    div.classList.add("item");
    div.addEventListener("click", onclick, false);

    title.textContent = coin.coin_name;
    title.classList.add("color");

    img.src = coin.coin_icon;

    div.appendChild(title);
    div.appendChild(img);

    return div
}

fetch("https://api.tauros.io/api/v2/coins/")
    .then(response => response.json())
    .then(data => {

        const coins = data.payload.cryto;
        console.log(coins);

        coins.forEach(item => {
            console.log(item);

            items.appendChild(newCoin(item));
        });

    });


