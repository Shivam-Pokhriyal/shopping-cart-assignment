import {fetchData,createElementHelper} from './utils'
let cart = [];

const getProductPageData=async()=>{
    const data = await fetchData('products');
    createProduct(data);
    const cartBtn=document.querySelector(".cart-button");
    cartBtn.addEventListener("click",()=>openCart())
  }

const createProduct=(products)=>{
    const productList=document.querySelector(".product-list");
    products.forEach(product=>{
      let productContainer= document.createElement("div");
      productContainer.className="product";
      //product title
      let productName=document.createElement("h2")
      productName.innerText=product.name;
      //product image
      let productImage= document.createElement("img");
      productImage.src=product.imageURL;
      productImage.alt=product.name;
      productImage.className="img-cat"
      //product description
      let productDescription=document.createElement("p");
      productDescription.innerText=product.description;
      productDescription.className="product__description"
      //card footer
      let productFooter=document.createElement("div");
      productFooter.className="product-list__cta"
      //create price element
      let productPrice=document.createElement("span")
      productPrice.innerText=`MRP Rs. ${product.price}`
      //create buy now button
      let productBuyBtn=document.createElement("button")
      productBuyBtn.innerText="Buy Now"
      productBuyBtn.className="button-primary"
      productBuyBtn.addEventListener("click",()=>addProductToCart(product))
  
      productFooter.appendChild(productPrice);
      productFooter.appendChild(productBuyBtn);
  
      productContainer.appendChild(productName);
      productContainer.appendChild(productImage);
      productContainer.appendChild(productDescription);
      productContainer.appendChild(productFooter);
      
      productList.appendChild(productContainer);
    })
}
const addProductToCart = (product) => {
    // check if product already exists in cart
    const productAlreadyExist =
      cart.filter((item) => item.id === product.id).length > 0;
  
    if (!productAlreadyExist) {
      product.quantity = 1;
      cart = [...cart, product];
  
      // Update cart items number
      const cartElm = document.querySelector('.cart-button');
      cartElm.innerHTML = `<i class="fas fa-shopping-cart"></i> ${cart.length} items`;
    }
};

getProductPageData();

const openCart = (e) => {
    e ? e.preventDefault() : null;
    var modal = document.getElementById('myModal');
    var span = document.querySelector('.close');

    let cartTotalPrice = 0;
  
    modal.style.display = 'block';
  
    const modalBody = document.querySelector('.modal-body');
    const modalFooter = document.querySelector('.modal-footer');
  
    if (cart.length === 0) {
      // Show Empty cart
      modalBody.innerHTML = '';
      modalFooter.innerHTML = '';
  
      const buttonCta = createElementHelper('button', null, 'Start Shopping');
      buttonCta.type = 'button';
      buttonCta.addEventListener('click', () => {
        modal.style.display = 'none';
      });
      modalFooter.appendChild(buttonCta);
      modalFooter.style.margin = 0;
  
      const div = createElementHelper(
        'div',
        'flex-column flex-jc-c flex-ai-c',
        null,
        ` <h2>No items in your cart</h2>
        <p>Your favorite items are just a click away</p>`
      );
      div.style.marginTop = '30%';
      modalBody.appendChild(div);
      modalBody.style.background = 'white';
    } else {
      // Build cart
      const cartHeader = document.getElementById('cartHeader');
      cartHeader.innerHTML = `My Cart <span> (${cart.length} items) </span>`;
      modalBody.innerHTML = '';
      modalFooter.innerHTML = `
      <p>Promo code can be applied on payment page</p>
                <button type="button" class="flex flex-jc-sb">
                  Proceed to Checkout <span>Rs.187</span>
                </button>
      `;
      modalFooter.style.marginTop = '5px';
      cart.map((product) => {
        const { name, imageURL, price, quantity } = product;
  
        const row = createElementHelper('div', 'row');
        modalBody.appendChild(row);
  
        const img = createElementHelper('img', 'img-modal');
        img.src = imageURL;
        img.alt = name;
        row.appendChild(img);
  
        const cartInfoDiv = createElementHelper('div', 'cart-info');
        row.appendChild(cartInfoDiv);
  
        const h2 = createElementHelper('h2', '', name);
        cartInfoDiv.appendChild(h2);
  
        const controlButtonDiv = createElementHelper('div', 'control-buttons');
        cartInfoDiv.appendChild(controlButtonDiv);
  
        const minusIcon = createElementHelper('i', 'fas fa-minus-circle');
        minusIcon.addEventListener('click', () => decreaseQuantity(product));
  
        const plusIcon = createElementHelper('i', 'fas fa-plus-circle');
        plusIcon.addEventListener('click', () => addQuantity(product));
  
        const multiplier = createElementHelper('span', '', quantity);
        controlButtonDiv.appendChild(minusIcon);
        controlButtonDiv.appendChild(multiplier);
        controlButtonDiv.appendChild(plusIcon);
  
        const spanCross = createElementHelper('span', 'multiplier', 'x');
        cartInfoDiv.appendChild(spanCross);
  
        const totalPrice = price * quantity;
        cartTotalPrice += totalPrice;
  
        const spanPrice = createElementHelper('span', '', `Rs.${totalPrice}`);
        cartInfoDiv.appendChild(spanPrice);
  
        const divPrice = createElementHelper('div', 'price');
        const spanPrice2 = createElementHelper('span', '', `Rs.${totalPrice}`);
        row.appendChild(divPrice);
        divPrice.appendChild(spanPrice2);
      });
  
      // Append offer div
      const divOffer = createElementHelper('div', 'offer');
      modalBody.appendChild(divOffer);
  
      const offerImg = createElementHelper('img');
      offerImg.src = '../static/images/lowest-price.png';
      offerImg.alt = 'Offer Image';
  
      const span = createElementHelper(
        'span',
        '',
        "You won't find it cheaper anywhere"
      );
      divOffer.appendChild(offerImg);
      divOffer.appendChild(span);
  
      // Update price on checkout button
      const checkOutPriceElm = document.querySelector(
        '.modal-footer button span'
      );
      checkOutPriceElm.innerText = `Rs.${cartTotalPrice}`;
    }
  
    span.onclick = function () {
      modal.style.display = 'none';
    };
};
  
const addQuantity = (product) => {
    cart.map((item) => {
      if (item.id === product.id) item.quantity += 1;
    });
    openCart();
  };
  
const decreaseQuantity = (product) => {
    cart.map((item) => {
      if (item.id === product.id && item.quantity > 1) item.quantity -= 1;
    });
    openCart();
};