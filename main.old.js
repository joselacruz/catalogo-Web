const items = document.getElementById("products");
const loder = document.getElementById("lds-circle");
let countItem = 0; //variable inicializada y declarada en 0 para usar newAmount()
var numero = document.getElementById("Header__circle");
const carrito = document.getElementById("cartNodal");
const closeCarrito = document.getElementById("hiden-cart-nodal");
const carritoContainer = document.getElementById("displayNodal");
closeCarrito.addEventListener("click", cerrandoCarrito);

//Funcion para cerrar el cart nodal
function cerrandoCarrito () {
  carritoContainer.classList.remove("displayNodal").addClass("cartNodal");
  
}


// Funcion que Muestra el Nodal a darle click al carrito
function displayNodal() {
  carritoContainer.classList.add("displayNodal");
  crytoAmountChecker(monedas.BTC);
  crytoAmountChecker(monedas.ETH);
  crytoAmountChecker(monedas.USDCoin);
  crytoAmountChecker(monedas.LTC);
  crytoAmountChecker(monedas.BCH);
  crytoAmountChecker(monedas.XLM);
  crytoAmountChecker(monedas.DASH);
  crytoAmountChecker(monedas.ZEC);
  crytoAmountChecker(monedas.BEMB);
}

//funcion Para verificar si el monto de cada crypto es mayor a 0 
//para asi  poder escribirlas en nodal al darle click al carrito

function crytoAmountChecker(dato) {
  if (dato.monto.length > 0) {
    writeNodal(dato.name, dato.monto.length);
  }
}
// Funcion que escribe los elementos html del carrito


function writeNodal(title, value) {
  const coinDiv = document.createElement("div");
  coinDiv.classList.add("item_crypto");
  const coinTitle = document.createElement("p");
  const monto = document.createElement("p");
  coinTitle.textContent = title;
  monto.textContent = value;
  carritoContainer.appendChild(coinDiv);
  coinDiv.appendChild(monto);
  coinDiv.appendChild(coinTitle);
}


//Monedas almacenas parara identificarlas en el Carrito.
let monedas = {
  USDCoin: {
    name: "USD Coin",
    monto: [],
  },
  BTC: {
    name: "Bitcoin",
    monto: [],
  },
  ETH: {
    name: "Ethereum",
    monto: [],
  },
  LTC: {
    name: "Litecoin",
    monto: [],
  },
  BCH: {
    name: "Bitcoin Cash",
    monto: [],
  },
  XLM: {
    name: "Stellar",
    monto: [],
  },
  DASH: {
    name: "Dash",
    monto: [],
  },
  ZEC: {
    name: "ZCash",
    monto: [],
  },
  BEMB: {
    name: "Bitcoin Embassy Bar",
    monto: [],
  },
};

//Funcion que crea los cards de Cryptos
//con funcion añidada para la interaccion con las cards

function newCoin(coin) {
  const div = document.createElement("div");
  const title = document.createElement("h2");
  const img = document.createElement("img");
  let stockAmountTitle = document.createElement("h3");
  div.classList.add("item");
  div.addEventListener("click", newAmount);

  title.textContent = coin.coin_name;
  title.classList.add("color");
  stockAmountTitle.classList.add("stock-amount");
  img.src = coin.coin_icon;
  stockAmountTitle.textContent = coin.decimals; //Cantidad de articulos disponible para cada card
 
  //Funcion para agregar numeros al carrito y ir restando segun la cantidad disponible y mas..
  function newAmount() {
    carrito.addEventListener("click", displayNodal);
    

    if (stockAmountTitle.textContent > 0) {
      stockAmountTitle.textContent = --stockAmountTitle.textContent;
      countItem = ++countItem;
      numero.textContent = countItem;
      numero.classList.add("Header-circle-quanty");
      const title = event.currentTarget.childNodes[0];
      title.classList.toggle("color");

      //Identifico la  card  que iterar al hacer click para que  
      //en cada iteracion  hacer push al array de cada moneda
      //para crezca la longitud del array asi determinare la cantidad
      //de Btc o X Crypto Esta Raro;
      

      switch (coin.coin_name) {
        case "USD Coin":
          monedas.USDCoin.monto.push(countItem);
          break;
        case "Bitcoin":
          monedas.BTC.monto.push(countItem);
          break;
        case "Ethereum":
          monedas.ETH.monto.push(countItem);
          break;
        case "Litecoin":
          monedas.LTC.monto.push(countItem);
          break;
        case "Bitcoin Cash":
          monedas.BCH.monto.push(countItem);
          break;
        case "Stellar":
          monedas.XLM.monto.push(countItem);
          break;
        case "Dash":
          monedas.DASH.monto.push(countItem);
          break;
        case "ZCash":
          monedas.ZEC.monto.push(countItem);
          break;
        case "Bitcoin Embassy Bar":
          monedas.BEMB.monto.push(countItem);
          break;
        default:
        //
      }
    }
    
    else {
      alert(`Ya wey! No Hay Mas ${title.textContent}`);
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

