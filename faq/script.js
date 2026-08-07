/* ==================================================
            KAARU FAQ PAGE
            SCRIPT.JS
================================================== */



/* =====================================================
                STICKY NAVBAR
===================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.marginTop = "0px";

        header.style.background = "transparent";

        header.querySelector("div > div").classList.add(
            "shadow-xl"
        );

    } else {

        header.querySelector("div > div").classList.remove(
            "shadow-xl"
        );

    }

});


/* =====================================================
                PROGRESS BAR
===================================================== */

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const percent = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = percent + "%";

});


/* =====================================================
                MOBILE MENU
===================================================== */

function openMenu() {

    mobileMenu.classList.remove("translate-x-full");

    overlay.classList.remove("hidden");

    document.body.style.overflow = "hidden";

}

function closeMobileMenu() {

    mobileMenu.classList.add("translate-x-full");

    overlay.classList.add("hidden");

    document.body.style.overflow = "auto";

}

if (menuBtn) {

    menuBtn.addEventListener("click", openMenu);

}

if (closeMenu) {

    closeMenu.addEventListener("click", closeMobileMenu);

}

if (overlay) {

    overlay.addEventListener("click", closeMobileMenu);

}


/* =====================================================
            CLOSE MENU WHEN CLICK LINK
===================================================== */

document
.querySelectorAll(".mobile-link")
.forEach(link => {

    link.addEventListener("click", () => {

        closeMobileMenu();

    });

});









/* ==================================================
                FAQ ACCORDION
================================================== */



const faqButtons =
document.querySelectorAll(".faq-question");




faqButtons.forEach(button=>{


button.addEventListener("click",()=>{


    const item =
    button.parentElement;


    const answer =
    item.querySelector(".faq-answer");



    document
    .querySelectorAll(".faq-item")
    .forEach(other=>{


        if(other !== item){


            other.classList.remove("active");


            other
            .querySelector(".faq-answer")
            .style.maxHeight = null;


        }


    });





    item.classList.toggle("active");





    if(item.classList.contains("active")){


        answer.style.maxHeight =
        answer.scrollHeight + "px";


    }


    else{


        answer.style.maxHeight = null;


    }



});



});

/* =====================================================
                    SHOPPING CART
===================================================== */

let cart=[];

if(localStorage.getItem("kaaru-cart")){

cart=JSON.parse(localStorage.getItem("kaaru-cart"));

}

const cartBtn=document.getElementById("cartBtn");

const cartDrawer=document.getElementById("cartDrawer");

const closeCart=document.getElementById("closeCart");

const cartOverlay=document.getElementById("cartOverlay");

const cartItems=document.getElementById("cartItems");

const cartTotal=document.getElementById("cartSubtotal");

const cartCount=document.getElementById("cartCount");

const toast=document.getElementById("toast");

const drawerCount = document.getElementById("drawerCount");

function saveCart(){

localStorage.setItem(

"kaaru-cart",

JSON.stringify(cart)

);

}


function openCart(){

cartDrawer.classList.add("active");

cartOverlay.classList.add("active");

document.body.style.overflow="hidden";

}


function closeCartDrawer(){

cartDrawer.classList.remove("active");

cartOverlay.classList.remove("active");

document.body.style.overflow="auto";

}


cartBtn.onclick=openCart;

closeCart.onclick=closeCartDrawer;

cartOverlay.onclick=closeCartDrawer;


/* =====================================================
                ADD TO CART
===================================================== */

document

.querySelectorAll(".add-cart-btn")

.forEach(button=>{

button.addEventListener("click",()=>{

const name=button.dataset.name;

const price=Number(button.dataset.price);

const exist=cart.find(

item=>item.name===name

);

if(exist){

exist.qty++;

}else{

cart.push({

name,

price,

qty:1

});

}

saveCart();

renderCart();

showToast();

});

});


/* =====================================================
                    RENDER CART
===================================================== */

function renderCart(){

    drawerCount.textContent =
    cart.reduce((total,item)=>total+item.qty,0);

    if(cart.length===0){

        cartItems.innerHTML = `

        <div class="empty-cart">

            <i class="fa-solid fa-bag-shopping"></i>

            <h3>Shopping Bag Empty</h3>

            <p>
                Tambahkan produk favoritmu ke dalam keranjang.
            </p>

        </div>

        `;

        cartTotal.textContent = "Rp0";

        return;

    }

    cartItems.innerHTML = cart.map((item,index)=>`

        <div class="cart-item">

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>

            <div class="cart-item-content">

                <h4>${item.name}</h4>

                ${item.color ? `<p>${item.color}</p>` : ""}

                <div class="cart-price">

                    Rp ${item.price.toLocaleString("id-ID")}

                </div>

                <div class="cart-qty">

                    <button
                    onclick="decreaseQty(${index})">

                        -

                    </button>

                    <span>

                        ${item.qty}

                    </span>

                    <button
                    onclick="increaseQty(${index})">

                        +

                    </button>

                </div>

                <button
                class="remove-item"
                onclick="removeItem(${index})">

                    <i class="fa-solid fa-trash"></i>

                    Remove

                </button>

            </div>

        </div>

    `).join("");

    const total = cart.reduce((sum,item)=>{

        return sum + (item.price * item.qty);

    },0);

    cartTotal.textContent =
    "Rp " + total.toLocaleString("id-ID");

}


/* =====================================================
                QUANTITY
===================================================== */

function increaseQty(index){

cart[index].qty++;

saveCart();

renderCart();

}


function decreaseQty(index){

cart[index].qty--;

if(cart[index].qty<=0){

cart.splice(index,1);

}

saveCart();

renderCart();

}


function removeItem(index){

cart.splice(index,1);

saveCart();

renderCart();

}
/* =====================================================
                SCROLL REVEAL
===================================================== */


const reveals =
document.querySelectorAll(".reveal");



const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add(
"active"
);


observer.unobserve(
entry.target
);


}


});


},
{

threshold:.15

}

);



reveals.forEach(
(element)=>{

observer.observe(element);

});