/* ==========================================
                LOADER
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 1200);

});

/* ==========================================
            PROGRESS BAR
========================================== */

const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    progressBar.style.width = progress + "%";

});

/* ==========================================
            STICKY HEADER
========================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});
/* ==========================================
            MOBILE MENU
========================================== */

const menuBtn = document.getElementById("menuBtn");

const closeMenu = document.getElementById("closeMenu");

const mobileMenu = document.getElementById("mobileMenu");

const overlay = document.getElementById("overlay");

function openMenu(){

    mobileMenu.classList.remove("translate-x-full");

    overlay.classList.remove("hidden");

    document.body.style.overflow = "hidden";

}

function hideMenu(){

    mobileMenu.classList.add("translate-x-full");

    overlay.classList.add("hidden");

    document.body.style.overflow = "";

}

menuBtn.addEventListener("click", openMenu);

closeMenu.addEventListener("click", hideMenu);

overlay.addEventListener("click", hideMenu);

/* ==========================================
            ESC KEY
========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        hideMenu();

    }

});

/* ==========================================
        CLOSE MENU WHEN LINK CLICKED
========================================== */

document.querySelectorAll(".mobile-link").forEach(link=>{

    link.addEventListener("click",()=>{

        hideMenu();

    });

});

/* ==========================================
            SEARCH BUTTON
========================================== */

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click",()=>{

    const input=document.getElementById("searchProduct");

    input.scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

    setTimeout(()=>{

        input.focus();

    },500);

});

/* ==========================================
            CART BUTTON
========================================== */

const cartBtn=document.getElementById("cartBtn");

cartBtn.addEventListener("click",()=>{

    window.location.href="../cart/index.html";

});
/* ==========================================
            PRODUCT SEARCH
========================================== */

const searchInput = document.getElementById("searchProduct");

const productGrid = document.getElementById("productGrid");

const productCards = document.querySelectorAll(".product-card");

const productCount = document.getElementById("productCount");

searchInput.addEventListener("keyup", filterProducts);

function filterProducts(){

    const keyword = searchInput.value.toLowerCase();

    let visible = 0;

    productCards.forEach(card=>{

        const name = card.dataset.name.toLowerCase();

        if(name.includes(keyword)){

            card.style.display = "block";

            visible++;

        }else{

            card.style.display = "none";

        }

    });

    productCount.textContent = visible;

    checkEmptyProduct();

}

/* ==========================================
            CATEGORY FILTER
========================================== */

const categoryFilter = document.getElementById("filterCategory");

categoryFilter.addEventListener("change",()=>{

    const value = categoryFilter.value;

    let visible = 0;

    productCards.forEach(card=>{

        if(value==="all"){

            card.style.display="block";

            visible++;

        }

        else if(card.dataset.category===value){

            card.style.display="block";

            visible++;

        }

        else{

            card.style.display="none";

        }

    });

    productCount.textContent=visible;

    checkEmptyProduct();

});

/* ==========================================
                SORT PRODUCT
========================================== */

const sortSelect=document.getElementById("sortProduct");

sortSelect.addEventListener("change",sortProducts);

function sortProducts(){

    const cards=[...productCards];

    switch(sortSelect.value){

        case"az":

            cards.sort((a,b)=>

                a.dataset.name.localeCompare(b.dataset.name)

            );

        break;

        case"za":

            cards.sort((a,b)=>

                b.dataset.name.localeCompare(a.dataset.name)

            );

        break;

        case"low":

            cards.sort((a,b)=>

                Number(a.dataset.price)-Number(b.dataset.price)

            );

        break;

        case"high":

            cards.sort((a,b)=>

                Number(b.dataset.price)-Number(a.dataset.price)

            );

        break;

        default:

        return;

    }

    cards.forEach(card=>{

        productGrid.appendChild(card);

    });

}

/* ==========================================
            EMPTY PRODUCT
========================================== */

const emptyMessage=document.createElement("div");

emptyMessage.innerHTML=`

<div style="
padding:80px;
text-align:center;
grid-column:1/-1;
">

<h2 style="
font-size:36px;
font-family:'Playfair Display';
">

No Product Found

</h2>

<p style="
margin-top:15px;
color:#8C7A6B;
">

Try another keyword.

</p>

</div>

`;

function checkEmptyProduct(){

    const visible=[...productCards].filter(card=>

        card.style.display!=="none"

    );

    if(visible.length===0){

        if(!productGrid.contains(emptyMessage))

        productGrid.appendChild(emptyMessage);

    }

    else{

        if(productGrid.contains(emptyMessage))

        productGrid.removeChild(emptyMessage);

    }

}
/* ==========================================
            SHOPPING CART
========================================== */

let cart = JSON.parse(localStorage.getItem("kaaru_cart")) || [];

const cartCounter = document.getElementById("cartCount");

function updateCartCounter(){

    cartCounter.textContent = cart.length;

}

updateCartCounter();

/* ==========================================
            ADD TO CART
========================================== */

document.querySelectorAll(".cart-btn").forEach(button=>{

    button.addEventListener("click",function(){

        const card=this.closest(".product-card");

        const product={

            id:Date.now(),

            name:card.dataset.name,

            price:Number(card.dataset.price),

            image:card.querySelector("img").src,

            qty:1

        };

        cart.push(product);

        localStorage.setItem(

            "kaaru_cart",

            JSON.stringify(cart)

        );

        updateCartCounter();

        this.innerHTML='<i class="fa-solid fa-check"></i>';

        setTimeout(()=>{

            this.innerHTML='<i class="fa-solid fa-bag-shopping"></i>';

        },1200);

    });

});

/* ==========================================
                WISHLIST
========================================== */

let wishlist = JSON.parse(

    localStorage.getItem("kaaru_wishlist")

) || [];

document.querySelectorAll(".wishlist-btn").forEach(btn=>{

    btn.addEventListener("click",function(){

        const icon=this.querySelector("i");

        const card=this.closest(".product-card");

        const name=card.dataset.name;

        if(wishlist.includes(name)){

            wishlist=wishlist.filter(item=>item!==name);

            icon.className="fa-regular fa-heart";

        }

        else{

            wishlist.push(name);

            icon.className="fa-solid fa-heart";

        }

        localStorage.setItem(

            "kaaru_wishlist",

            JSON.stringify(wishlist)

        );

    });

});

/* ==========================================
        LOAD WISHLIST
========================================== */

document.querySelectorAll(".product-card").forEach(card=>{

    const name=card.dataset.name;

    if(wishlist.includes(name)){

        card.querySelector(".wishlist-btn i")

        .className="fa-solid fa-heart";

    }

});

/* ==========================================
            NEWSLETTER
========================================== */

const newsletter=document.getElementById("newsletterForm");

newsletter.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert(

"Thank you for subscribing to KAARU Newsletter 🤍"

    );

    newsletter.reset();

});
/* ==========================================
            FADE ANIMATION
========================================== */

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

document.querySelectorAll(

"section,.product-card"

).forEach(el=>{

    el.classList.add("fade-up");

    observer.observe(el);

});

/* ==========================================
            LOAD MORE
========================================== */

const loadBtn=document.getElementById("loadMoreBtn");

if(loadBtn){

    loadBtn.addEventListener("click",()=>{

        alert(

"Semua koleksi sedang ditampilkan."

        );

    });

}

/* ==========================================
            SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(

            this.getAttribute("href")

        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/* ==========================================
            PAGE READY
========================================== */

console.log(

"KAARU Collection Loaded Successfully 🤍"

);
