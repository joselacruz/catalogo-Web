const items = document.getElementById("products");
const loder = document.getElementById("lds-circle");
let countItem = 0; //variable inicializada y declarada en 0 para usar newAmount()

// Monedas almacenas parara identificarlas en el Carrito.
let shopping_cart = {};

var numero = document.getElementById("Header__circle");
const carrito = document.getElementById("cartNodal");
const closeCarrito = document.getElementById("hiden-cart-nodal");
const carritoContainer = document.getElementById("displayNodal");
let shopping_cart_container = carritoContainer.getElementsByClassName("shopping_cart_list")[0];


closeCarrito.addEventListener("click", cerrandoCarrito);

// Funcion para cerrar el cart nodal
function cerrandoCarrito() {
    // carritoContainer.classList.add("cartNodal");
    carritoContainer.classList.remove("displayNodal");
    clearNodal();
}



// Funcion que Muestra el Nodal a darle click al carrito
function displayNodal() {
    
    Object.keys(shopping_cart).forEach(key => {
        let data = shopping_cart[key];
        writeNodal(data.title, data.amount);
    });

    var contenedorCart = document.getElementById("list");
    var divsCart = contenedorCart.getElementsByTagName("div");
   for(var i=0; i < divsCart.length; i++){
   let spanLess =  divsCart[i].getElementsByTagName("span")[1];
   let spanPlus =  divsCart[i].getElementsByTagName("span")[0];
   let coinbit = divsCart[i].getElementsByTagName("p")[0];
   
  
   spanLess.addEventListener("click", event => {
    if(coinbit.textContent > 0) {coinbit.textContent = --coinbit.textContent;
        countItem = --countItem;
        numero.textContent = countItem;
        
        
    }
      
});

   spanPlus.addEventListener("click", event => {
    coinbit.textContent = ++coinbit.textContent; 
    countItem = ++coinbit.textContent;
    numero.textContent = countItem;
   });

  };

    carritoContainer.classList.add("displayNodal");
   
}




// Funcion que escribe los elementos html del carrito
function writeNodal(title, amount,) {
    const coinDiv = document.createElement("div");
    coinDiv.classList.add("item_crypto");
    const coinTitle = document.createElement("h3");
    coinTitle.classList.add("crypto_cart_title");
    const monto = document.createElement("p");
    monto.setAttribute("id","monto");
    coinTitle.textContent = title;
    monto.textContent = amount;
    const undo = document.createElement("span");
    const rendo = document.createElement("span");
    undo.textContent = "+";
    rendo.textContent = "-";
    coinDiv.appendChild(undo);
    coinDiv.appendChild(rendo);
    coinDiv.appendChild(monto);
    coinDiv.appendChild(coinTitle);
    shopping_cart_container.appendChild(coinDiv);

}


// Funcion que limpia los elementos html del carrito
function clearNodal() {
    shopping_cart_container.innerHTML = "";
}


//Funcion para agregar numeros al carrito y ir restando segun la cantidad disponible y mas..
function newAmount(event) {
    carrito.addEventListener("click", displayNodal);

    let own =  event.currentTarget;
    let stockAmountTitle = own.getElementsByClassName("stock-amount")[0];
    const title = own.childNodes[0];

    
  

    if (stockAmountTitle.textContent > 0) {
        stockAmountTitle.textContent = --stockAmountTitle.textContent;
        countItem = ++countItem;
        numero.textContent = countItem;
        numero.classList.add("Header-circle-quanty");
        // agregar elementos al carrito
        shopping_cart[own.id] = {
            title: title.innerHTML,
            amount: shopping_cart[own.id] ? shopping_cart[own.id].amount + 1 : 1, // operador ternario.
        }

        //Identifico la  card  que iterar al hacer click para que  
        //en cada iteracion  hacer push al array de cada moneda
        //para crezca la longitud del array asi determinare la cantidad
        //de Btc o X Crypto Esta Raro;

    }

    else {
        alert(`Ya wey! No Hay Mas ${title.textContent}`);
        own.removeEventListener("click", newAmount);
        title.classList.toggle("title-color-empty");
    }
}

//Funcion que crea los cards de Cryptos
//con funcion añidada para la interaccion con las cards
function newCoin(coin) {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const img = document.createElement("img");
    let stockAmountTitle = document.createElement("h3");
    div.classList.add("item");
    div.id = coin.coin;
    div.addEventListener("click", newAmount);
    title.textContent = coin.coin_name;
    title.classList.add("color");
    stockAmountTitle.classList.add("stock-amount");
    img.src = coin.coin_icon;
    stockAmountTitle.textContent = coin.decimals; //Cantidad de articulos disponible para cada card

    div.appendChild(title);
    div.appendChild(img);
    div.appendChild(stockAmountTitle);
    return div;
    
}

fetch("https://api.tauros.io/api/v2/coins/")
    .then((response) => response.json())
    .then((data) => {
        const coins = data.payload.cryto;

        coins.forEach((item) => {
            items.appendChild(newCoin(item));
        });

        document.addEventListener("load", hiddenPreloder);
        hiddenPreloder();
    });



function hiddenPreloder() {
    loder.style.display = "none";
}


