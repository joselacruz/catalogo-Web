
const items = document.getElementById("products");
const loder = document.getElementById("lds-circle");
let countItem = 0;
var numero = document.getElementById("Header__circle");

function onclick(event) {
    const title = event.currentTarget.childNodes[0];
    title.classList.toggle("color"); 
}

function counterNum (){
    countItem = ++ countItem;
    numero.textContent=countItem;
    numero.classList.add("Header-circle-quanty")
}

function newCoin(coin) {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const img = document.createElement("img");
    div.classList.add("item");
    div.addEventListener("click", onclick, false);
    div.addEventListener("click", counterNum )

    title.textContent = coin.coin_name;
    title.classList.add("color");

    img.src = coin.coin_icon;

    div.appendChild(title);
    div.appendChild(img);
    return div
    return cargaOk= true;
}

fetch("https://api.tauros.io/api/v2/coins/")
    .then(response => response.json())
    .then(data => {

        const coins = data.payload.cryto;

        coins.forEach(item => {

            items.appendChild(newCoin(item));
            
        });
        
        document.addEventListener("load", hiddenPreloder);
        hiddenPreloder();


    });
   
    function hiddenPreloder ()
    {
loder.style.display ="none";
    }
