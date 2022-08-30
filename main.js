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

closeCarrito.addEventListener("click",cerrandoCarrito);
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
  const remove = document.createElement("span");
  coinDiv.classList.add(clas);
  coinDiv.append(img, rendo, undo, monto, coinTitle,remove);

  shopping_cart_container.appendChild(coinDiv);
 //boton + carrito
  rendo.addEventListener("click", () => { 
    checkShoppingCart(true, coinDiv, monto);
    animate(rendo);
    setTimeout(() => {
      stopAnimate(rendo);
    }, 300);
  });

 //boton - carrito
  undo.addEventListener("click", () => {
    checkShoppingCart(false, coinDiv, monto);
    animate(undo);
    setTimeout(() => {
      stopAnimate(undo);
    }, 300);
  });
   //boton delete de los elementos del  carrito
  remove.addEventListener("click", () => {
    deleteElementCart(coinDiv);
  })
}

//Funcion que incrementa y agrega la cantidad  de Objetos a (shopping_cart)

function newAmount(bolean) {
  let own = event.currentTarget;
  let stockAmountTitle = own.parentNode.getElementsByClassName("stock-amount")[0];
  const title = own.parentNode.childNodes[0];
  const img = own.parentNode.childNodes[1].childNodes[0];
  let iconLessMainShow = own.parentNode.childNodes[5];
  let iconPlusMainShow = own.parentNode.childNodes[4];

  // agregar elementos al carrito  al clikear + body
  if (stockAmountTitle.textContent > 0&&bolean) {
    stockAmountTitle.textContent = --stockAmountTitle.textContent;
    countItem = ++countItem;
    numero.textContent = countItem;
  
    numero.classList.add("Header-circle-quanty");
    shopping_cart[own.parentNode.id] = {
      title: title.innerHTML,
      amount: shopping_cart[own.parentNode.id] ? shopping_cart[own.parentNode.id].amount + 1 : 1,
      stock: parseInt(own.parentNode.childNodes[2].textContent),
      img:img.src,
     
    };
    
    if(stockAmountTitle.textContent < 1) {
      title.classList.add("title-color-empty");
      iconPlusMainShow.className = "inactive";
      checkCartIsEmpy();
     
    }
   
        
    
  }

 

  shopping_cart_container.innerHTML = ""; //Para que los elementos del carrito no se repitan
  Object.keys(shopping_cart).forEach((key) => {
    let data = shopping_cart[key];
    iconLessMainShow.className = "cart-less";

   // Quitar  elementos al carrito  al clikear - body
     if(!bolean && own.parentNode.id == key && data.amount > 0){
      title.classList.remove("title-color-empty");
      iconPlusMainShow.className = "cart-plus";
    shopping_cart[own.parentNode.id] = {
      title: title.innerHTML,
      amount: shopping_cart[own.parentNode.id].amount = shopping_cart[own.parentNode.id].amount- 1 ,
      stock: parseInt(own.parentNode.childNodes[2].textContent),
      img:img.src,
    };

    stockAmountTitle.textContent = ++stockAmountTitle.textContent;
    countItem = --countItem;
    numero.textContent = countItem;
   if(shopping_cart[own.parentNode.id].amount == 0) {
    delete shopping_cart[own.parentNode.id];
    checkCartIsEmpy();
   
   } 
  }
  carrito.addEventListener("click", displayNodal);
  writeNodal(data.title, data.amount, key, data.img);
  
  });

  
}

//Funcion que crea los cards de Cryptos
//con funcion añidada para la interaccion con las cards
function newCoin(coin) {
  const div = document.createElement("div");
  const title = document.createElement("h2");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const stockAmountTitle = document.createElement("h3");
  const containerInfoCard = document.createElement("div");
  containerInfoCard.classList.add('details-card');
  const cardInfo1 = document.createElement("p");
  const cardInfo2 = document.createElement("p");
  const cardInfo3 = document.createElement("p");
  const cartplus = document.createElement("span");
  const cartless = document.createElement("span");
  cartplus.classList.add("cart-plus");
  cartless.classList.add("cart-less","inactive");
  cardInfo1.textContent = coin.coin;
  cardInfo2.textContent = coin.fee_withdraw;
  cardInfo3.textContent = coin.confirmations_required;
  div.classList.add("item");
  div.id = coin.coin;
  //boton  + de las card  vista principal 
  cartplus.addEventListener("click",()=>{
    newAmount(true);
    animate(cartplus);
    setTimeout(() => {
      stopAnimate(cartplus);
    }, 300);
    
  });
    //boton  - de las card  vista principal 
  cartless.addEventListener("click",()=>{
    newAmount(false);
    animate(cartless);
    setTimeout(() => {
      stopAnimate(cartless);
    }, 300);

  });
  title.textContent = coin.coin_name;
  title.classList.add("color");
  stockAmountTitle.classList.add("stock-amount");
  img.src = coin.coin_icon;
  stockAmountTitle.textContent = coin.decimals; //Cantidad de articulos disponible para cada card
  figure.append(img);
  containerInfoCard.append(cardInfo1,cardInfo2,cardInfo3);
  div.append(title, figure, stockAmountTitle,containerInfoCard,cartplus,cartless);
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
      checkCartIsEmpy();
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
    let editClassPlusBody = items.childNodes[i].childNodes[4];
    let editClassLessBody = items.childNodes[i].childNodes[5];

    if (clave == obtainId) {
      obtainStockTitle.textContent = dato;

      if (dato == 0 && bolean) {
        editClassTitle.className = "color title-color-empty";
        editClassPlusBody.className = "inactive"
      }

      if (dato > 0 && !bolean) {
        editClassTitle.className = "color";
        editClassPlusBody.className = "cart-plus";
      }
     
    }
  }
}

//Funcion para borrado rapido del articulos del carrito 
//y interaccion las card de la vista principal para reponer el stock
function deleteElementCart (elementSelect) {
  Object.keys(shopping_cart).forEach((key) => {
    let data = shopping_cart[key];
    let element = elementSelect.classList.contains(key);
   let body = items.childNodes;
   body.forEach((item) => {
    card = body[item];
  
    if(item.id === key && element ){
      item.childNodes[2].textContent = data.stock + data.amount;
      item.childNodes[0].className = "color";
      item.childNodes[4].className = "cart-plus";
      item.childNodes[5].className = "inactive";
      delete shopping_cart[key];
      elementSelect.style.display = "none";
      countItem = countItem - data.amount;
      numero.textContent = countItem; 
      checkCartIsEmpy();
    }
   })
  });
}

//Funcion que verifica si el objeto  del carrito esta vacio para cerrarlo automaticamentee

function checkCartIsEmpy () {
  let isShoppingCartEmpty = Object.entries(shopping_cart).length === 0;
  if (isShoppingCartEmpty) {
    cerrandoCarrito();
    numero.classList.remove("Header-circle-quanty");
 }
}

