/* =====================================================
                    ELEMENT
===================================================== */

const loader = document.getElementById("loader");

const progressBar = document.getElementById("progressBar");

const header = document.getElementById("header");

const menuBtn = document.getElementById("menuBtn");

const closeMenu = document.getElementById("closeMenu");

const mobileMenu = document.getElementById("mobileMenu");

const overlay = document.getElementById("overlay");

const backToTop = document.getElementById("backToTop");


/* =====================================================
                    LOADER
===================================================== */

window.addEventListener("load", () => {

    const bar = document.querySelector(".loader-line span");

    if (bar) {
        bar.style.width = "100%";
    }

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

    }, 900);

});


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


/* =====================================================
            SCROLL REVEAL
===================================================== */

const revealElements =
document.querySelectorAll(

".product-card,.feature-card,.value-card,.palette-card,section"

);

const revealObserver =

new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.15

}

);

revealElements.forEach(item=>{

item.classList.add("fade-up");

revealObserver.observe(item);

});


/* =====================================================
                BACK TO TOP
===================================================== */

if(backToTop){

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

backToTop.classList.add("show");

}else{

backToTop.classList.remove("show");

}

});

backToTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}


/* =====================================================
                IMAGE PARALLAX
===================================================== */

window.addEventListener("scroll",()=>{

const heroImage=document.querySelector(".hero-image img");

if(!heroImage) return;

const offset=window.pageYOffset;

heroImage.style.transform=
`translateY(${offset*0.08}px) scale(1.05)`;

});


/* =====================================================
            ACTIVE NAVIGATION
===================================================== */

const currentPage = location.pathname;

document.querySelectorAll(".nav-link").forEach(link => {

    if (currentPage.includes(link.getAttribute("href"))) {

        link.style.color = "#8C7A6B";

    }

});


/* =====================================================
                ESC CLOSE MENU
===================================================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeMobileMenu();

    }

});


/* =====================================================
                WINDOW RESIZE
===================================================== */

window.addEventListener("resize",()=>{

if(window.innerWidth>1024){

closeMobileMenu();

}

});
/* =====================================================
                    SEARCH MODAL
===================================================== */

const searchBtn = document.getElementById("searchBtn");
const searchModal = document.getElementById("searchModal");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

const products = [
    {
        name: "Ivory Whisper",
        price: 189000
    },
    {
        name: "Warm Dune",
        price: 189000
    },
    {
        name: "Taupe Veil",
        price: 189000
    },
    {
        name: "Soft Dune",
        price: 189000
    },
    {
        name: "Sage Mist",
        price: 189000
    }
];

if(searchBtn){

    searchBtn.onclick=()=>{

        searchModal.classList.add("active");

        searchInput.focus();

    }

}

if(closeSearch){

    closeSearch.onclick=()=>{

        searchModal.classList.remove("active");

    }

}

window.addEventListener("click",(e)=>{

    if(e.target===searchModal){

        searchModal.classList.remove("active");

    }

});


if(searchInput){

searchInput.addEventListener("keyup",()=>{

const keyword=searchInput.value.toLowerCase();

const result=products.filter(item=>{

return item.name.toLowerCase().includes(keyword);

});

if(keyword===""){

searchResult.innerHTML="";

return;

}

searchResult.innerHTML=result.map(item=>`

<div class="flex justify-between items-center py-4 border-b">

<div>

<h4 class="font-semibold">${item.name}</h4>

<p class="text-sm text-gray-500">

Rp ${item.price.toLocaleString("id-ID")}

</p>

</div>

<button
class="btn-primary">

Lihat

</button>

</div>

`).join("");

});

}


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

const cartTotal=document.getElementById("cartTotal");

const cartCount=document.getElementById("cartCount");

const toast=document.getElementById("toast");


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

cartCount.textContent=

cart.reduce((a,b)=>a+b.qty,0);


if(cart.length===0){

cartItems.innerHTML=`

<div class="text-center mt-20">

<h3 class="font-serif text-2xl">

Keranjang Masih Kosong

</h3>

</div>

`;

cartTotal.textContent="Rp0";

return;

}


cartItems.innerHTML=

cart.map((item,index)=>`

<div class="border-b pb-5 mb-5">

<div class="flex justify-between">

<div>

<h4 class="font-semibold">

${item.name}

</h4>

<p>

Rp ${item.price.toLocaleString("id-ID")}

</p>

</div>

<button
onclick="removeItem(${index})">

<i class="fa-solid fa-trash"></i>

</button>

</div>

<div
class="flex items-center gap-3 mt-4">

<button
onclick="decreaseQty(${index})">

-

</button>

<strong>

${item.qty}

</strong>

<button
onclick="increaseQty(${index})">

+

</button>

</div>

</div>

`).join("");

const total=

cart.reduce(

(sum,item)=>{

return sum+(item.price*item.qty);

},

0

);

cartTotal.textContent=

"Rp "+total.toLocaleString("id-ID");

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
                    TOAST
===================================================== */

function showToast(){

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}


renderCart();
/* =====================================================
                    NEWSLETTER
===================================================== */

const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const email = newsletterEmail.value.trim();

        if (email === "") {

            alert("Silakan masukkan email.");

            return;

        }

        alert("Terima kasih telah berlangganan Newsletter KAARU ✨");

        newsletterForm.reset();

    });

}


/* =====================================================
                    FAQ ACCORDION
===================================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {

        item.classList.toggle("active");

    });

});


/* =====================================================
                LAZY IMAGE
===================================================== */

const lazyImages = document.querySelectorAll("img[data-src]");

const lazyObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const image = entry.target;

        image.src = image.dataset.src;

        image.removeAttribute("data-src");

        observer.unobserve(image);

    });

});

lazyImages.forEach(image => {

    lazyObserver.observe(image);

});


/* =====================================================
                BUTTON RIPPLE
===================================================== */

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        ripple.style.left = e.offsetX + "px";

        ripple.style.top = e.offsetY + "px";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


/* =====================================================
                ACTIVE MENU
===================================================== */

document.querySelectorAll(".nav-link").forEach(link => {

    if (window.location.pathname.includes(link.getAttribute("href"))) {

        link.classList.add("text-[#8C7A6B]");

    }

});


/* =====================================================
                HEADER SHADOW
===================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("shadow-xl");

    } else {

        header.classList.remove("shadow-xl");

    }

});


/* =====================================================
                ESC CLOSE
===================================================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        searchModal?.classList.remove("active");

        closeMobileMenu();

        closeCartDrawer();

    }

});


/* =====================================================
            SMOOTH SCROLL (Anchor)
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});


/* =====================================================
                PRELOAD IMAGE
===================================================== */

const preloadImages = [

    "assets/images/hero.jpg",
    "assets/images/product1.jpg",
    "assets/images/product2.jpg",
    "assets/images/product3.jpg"

];

preloadImages.forEach(src => {

    const image = new Image();

    image.src = src;

});


/* =====================================================
                PAGE FADE
===================================================== */

window.addEventListener("pageshow", () => {

    document.body.classList.add("loaded");

});


/* =====================================================
                CONSOLE CREDIT
===================================================== */

console.clear();

console.log("%cKAARU Beyond Basic", "font-size:22px;font-weight:bold;color:#4A3B32;");
console.log("%cDesigned & Developed by First Garage Web Development", "color:#8C7A6B;");


/* =====================================================
                INIT
===================================================== */

renderCart();

console.log("✅ Loader Ready");
console.log("✅ Navbar Ready");
console.log("✅ Search Ready");
console.log("✅ Cart Ready");
console.log("✅ Newsletter Ready");
console.log("✅ Animation Ready");
console.log("✅ Website Ready");
