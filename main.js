const items = document.getElementById("products");
const loder = document.getElementById("lds-circle");
let countItem = 0; //variable inicializada y declarada en 0 para usar newAmount()git 

// Monedas almacenas parara identificarlas en el Carrito.
let shopping_cart = {};
var numero = document.getElementById("Header__circle");
const carrito = document.getElementById("cartNodal");
const closeCarrito = document.getElementById("hiden-cart-nodal");
const carritoContainer = document.getElementById("displayNodal");
let shopping_cart_container =
  carritoContainer.getElementsByClassName("shopping_cart_list")[0];

closeCarrito.addEventListener("click", cerrandoCarrito);
// Funcion para cerrar el cart nodal
function cerrandoCarrito() {
  carritoContainer.classList.remove("displayNodal");
}

// Funcion que Muestra el Nodal a darle click al carrito
function displayNodal() {
  if (countItem > 0) {
    carritoContainer.classList.add("displayNodal");
  }
}

// Funcion que escribe los elementos html del carrito
function writeNodal(title, amount, clas, idimg) {
  const coinDiv = document.createElement("div");
  coinDiv.classList.add("item_crypto");
  const coinTitle = document.createElement("h3");
  coinTitle.classList.add("crypto_cart_title");
  const img = document.createElement("img");
  const monto = document.createElement("p");
  monto.setAttribute("id", "monto");
  coinTitle.textContent = title;
  img.setAttribute("src", idimg);
  monto.textContent = amount;
  const rendo = document.createElement("span");
  const undo = document.createElement("span");
  coinDiv.classList.add(clas);
  coinDiv.append(img, rendo, undo, monto, coinTitle);

  shopping_cart_container.appendChild(coinDiv);

  rendo.addEventListener("click", () => {
    checkShoppingCart(true, coinDiv, monto);
    animate(rendo);
    setTimeout(() => {
      stopAnimate(rendo);
    }, 300);
  });

  undo.addEventListener("click", () => {
    checkShoppingCart(false, coinDiv, monto);
    animate(undo);
    setTimeout(() => {
      stopAnimate(undo);
    }, 300);
  });
}

//Funcion que incrementa y agrega la cantidad  de Objetos a (shopping_cart)

function newAmount(event) {
  let own = event.currentTarget;
  animate(own);
  setTimeout(() => {
    stopAnimate(own);
  }, 300);
  let stockAmountTitle = own.getElementsByClassName("stock-amount")[0];
  const title = own.childNodes[0];
  const img = own.childNodes[1];

  if (stockAmountTitle.textContent > 0) {
    stockAmountTitle.textContent = --stockAmountTitle.textContent;
    countItem = ++countItem;
    numero.textContent = countItem;
    numero.classList.add("Header-circle-quanty");
    // agregar elementos al carrito
    shopping_cart[own.id] = {
      title: title.innerHTML,
      amount: shopping_cart[own.id] ? shopping_cart[own.id].amount + 1 : 1,
      stock: parseInt(own.childNodes[2].textContent),
      img: img.src,
    };
  } else {
    alert(`Ya wey! No Hay Mas ${title.textContent}`);
    title.classList.add("title-color-empty");
  }

  shopping_cart_container.innerHTML = "";
  Object.keys(shopping_cart).forEach((key) => {
    let data = shopping_cart[key];

    writeNodal(data.title, data.amount, key, data.img);
  });

  carrito.addEventListener("click", displayNodal);
}

//Funcion que crea los cards de Cryptos
//con funcion añidada para la interaccion con las cards
function newCoin(coin) {
  const div = document.createElement("div");
  const title = document.createElement("h2");
  const img = document.createElement("img");
  const stockAmountTitle = document.createElement("h3");
  div.classList.add("item");
  div.id = coin.coin;
  div.addEventListener("click", newAmount);
  title.textContent = coin.coin_name;
  title.classList.add("color");
  stockAmountTitle.classList.add("stock-amount");
  img.src = coin.coin_icon;
  stockAmountTitle.textContent = coin.decimals; //Cantidad de articulos disponible para cada card
  div.append(title, img, stockAmountTitle);
  return div;
}

fetch("https://api.tauros.io/api/v2/coins/")
  .then((response) => response.json())
  .then((data) => {
    const coins = data.payload.cryto;

    coins.forEach((item) => {
      setTimeout(()=> {                   //tiempo de esperar para que el loder permanzca mas tiempo
        items.appendChild(newCoin(item));
      }, 3000);
    });

    document.addEventListener("load", hiddenPreloder);
    setTimeout(hiddenPreloder,3000);    //tiempo de esperar para que el loder permanzca mas tiempo
    return coins;
  });

function hiddenPreloder() {
  loder.style.display = "none";
}

function animate(selector) {
  selector.classList.add("animateByClick");
}

function stopAnimate(selector) {
  if (selector.classList.contains("animateByClick")) {
    selector.classList.remove("animateByClick");
  }
}

//funcion para Restar o sumar los elementos del carrito asi como editar la cantidad disponible
//en la vista Principal

function checkShoppingCart(operador, elementSelect, displayMonto) {
  let sumOrRest = operador;
  Object.keys(shopping_cart).forEach((key) => {
    let data = shopping_cart[key];
    let element = elementSelect.classList.contains(key);
    //Incrementar los numeros del carrito solo si el stock es mayor a cero y si fue clikeado el icon +
    if (element && data.stock > 0 && operador) {
      countItem = ++countItem;
      numero.textContent = countItem;
      displayMonto.textContent = parseInt(displayMonto.textContent) + 1;
      data.amount = data.amount + 1;
      data.stock = data.stock - 1;
      interCardBody(data.stock, key, operador);
    }
    //Decreser los numeros del carrito solo si el monto es mayor a cero y si fue clikeado el icon -
    if (element && data.amount > 0 && !operador) {
      countItem = --countItem;
      numero.textContent = countItem;
      displayMonto.textContent = parseInt(displayMonto.textContent) - 1;
      data.amount = data.amount - 1;
      data.stock = data.stock + 1;
      interCardBody(data.stock, key, operador);
    }

    /// Cando el elemento del carrito sea 0  y sea clikeado el icon -
    //Desaparecemos el contenedor tambien  eliminamos ese objecto y finalmente comprobamos
    //si el objeto esta vacio Cerrar  El carrito
    if (data.amount <= 0 && !operador) {
      delete shopping_cart[key];
      elementSelect.style.display = "none";
      let isShoppingCartEmpty = Object.entries(shopping_cart).length === 0;
      if (isShoppingCartEmpty) {
        cerrandoCarrito();
        numero.classList.remove("Header-circle-quanty");
      }
    }
  });
}

//Funcion que me permite interar con las cards de crypto de la vista principal
//que ayuda a inteficar a cual restarle o Sumarle el stock Disponible
function interCardBody(dato, clave, bolean) {
  let lengtBody = items.childNodes.length;
  for (i = 0; lengtBody > i; i++) {
    let obtainId = items.childNodes[i].id;
    let obtainStockTitle = items.childNodes[i].childNodes[2];
    let editClassTitle = items.childNodes[i].childNodes[0];

    if (clave == obtainId) {
      obtainStockTitle.textContent = dato;

      if (dato == 0 && bolean) {
        editClassTitle.className = "color title-color-empty";
      }

      if (dato > 0 && !bolean) {
        editClassTitle.className = "color";
      }
    }
  }
}
