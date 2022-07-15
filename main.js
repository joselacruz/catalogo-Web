
const items = document.getElementById("products");
const loder = document.getElementById("lds-circle");
let countItem = 0; //variable inicializada y declarada en 0 para usar newAmount() 
var numero = document.getElementById("Header__circle");




//Funcion que crea los cards de Cryptos
//con funcion añidada para la interaccion con las cards

function newCoin(coin) {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const img = document.createElement("img");
    let stockAmountTitle =  document.createElement("h3");
    div.classList.add("item");
    div.addEventListener("click", onclick, false);
    div.addEventListener("click", newAmount);

    title.textContent = coin.coin_name;
    title.classList.add("color");
    stockAmountTitle.classList.add("stock-amount"); 
    img.src = coin.coin_icon;
    stockAmountTitle.textContent = coin.decimals; //Cantidad de articulos disponible para cada card

    function newAmount () { //Funcion para agregar numeros al carrito y ir restando segun la cantidad disponible y mas..
        if(stockAmountTitle.textContent > 0) {
            stockAmountTitle.textContent = --stockAmountTitle.textContent;
            countItem = ++ countItem;
            numero.textContent=countItem;
            numero.classList.add("Header-circle-quanty");
            const title = event.currentTarget.childNodes[0];
            title.classList.toggle("color"); 
        }
        else {
            alert (`Ya wey! No Hay Mas ${title.textContent}`)
            div.removeEventListener("click", newAmount);
            title.classList.toggle("title-color-empty"); 
        }
        
    }
    div.appendChild(title);
    div.appendChild(img);
    div.appendChild(stockAmountTitle);
    return div;

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
