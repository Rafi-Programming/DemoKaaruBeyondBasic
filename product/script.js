/* ==================================================
                KAARU PRODUCT PAGE
                SCRIPT.JS
==================================================*/



/* ==================================================
                    SELECTOR
==================================================*/

const body = document.body;

const header = document.querySelector(".header");

const menuBtn = document.getElementById("menuBtn");

const closeMenuBtn = document.getElementById("closeMenu");

const mobileMenu = document.getElementById("mobileMenu");

const overlay = document.getElementById("overlay");



/* ==================================================
                MOBILE MENU
==================================================*/

function openMenu(){

    if(!mobileMenu || !overlay) return;

    mobileMenu.classList.add("active");

    overlay.classList.add("active");

    body.style.overflow="hidden";

}

function closeMenu(){

    if(!mobileMenu || !overlay) return;

    mobileMenu.classList.remove("active");

    overlay.classList.remove("active");

    body.style.overflow="";

}

if(menuBtn){

    menuBtn.addEventListener("click",openMenu);

}

if(closeMenuBtn){

    closeMenuBtn.addEventListener("click",closeMenu);

}

if(overlay){

    overlay.addEventListener("click",closeMenu);

}



/* ==================================================
            CLOSE MENU WHEN CLICK LINK
==================================================*/

document.querySelectorAll(".mobile-nav a").forEach(link=>{

    link.addEventListener("click",closeMenu);

});



/* ==================================================
                STICKY HEADER
==================================================*/

window.addEventListener("scroll",()=>{

    if(!header) return;

    if(window.scrollY>40){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }

});



/* ==================================================
                SEARCH BUTTON
==================================================*/

const searchBtn=document.getElementById("searchBtn");

if(searchBtn){

    searchBtn.addEventListener("click",()=>{

        alert("Search feature coming soon.");

    });

}
/* ==================================================
                PRODUCT GALLERY
==================================================*/

const mainImage = document.getElementById("mainProductImage");

const thumbnails = document.querySelectorAll(".thumb");

if(mainImage && thumbnails.length){

    thumbnails.forEach((thumb)=>{

        thumb.addEventListener("click",()=>{

            thumbnails.forEach(item=>{

                item.classList.remove("active");

            });

            thumb.classList.add("active");

            const image = thumb.dataset.image;

if(image){

    mainImage.style.opacity = "0";

    const temp = new Image();

    temp.onload = function(){

        mainImage.src = image;

        mainImage.style.opacity = "1";

    };

    temp.src = image;

}

        });

    });

}



/* ==================================================
                COLOR SWATCH
==================================================*/

const swatches=document.querySelectorAll(".color-swatch");

const selectedColor=document.querySelector("#selectedColor strong");

if(swatches.length){

    swatches.forEach((swatch)=>{

        swatch.addEventListener("click",()=>{

            swatches.forEach(item=>{

                item.classList.remove("active");

            });

            swatch.classList.add("active");

            if(selectedColor){

                selectedColor.textContent=

                swatch.dataset.color;

            }

            if(mainImage && swatch.dataset.image){

                mainImage.style.opacity="0";

                setTimeout(()=>{

                    mainImage.src=swatch.dataset.image;

                    mainImage.style.opacity="1";

                },180);

            }

        });

    });

}



/* ==================================================
                QUANTITY
==================================================*/

const minusBtn=document.getElementById("minusQty");

const plusBtn=document.getElementById("plusQty");

const qtyValue=document.getElementById("qtyValue");

let quantity=1;

function updateQuantity(){

    if(qtyValue){

        qtyValue.textContent=quantity;

    }

}

if(minusBtn){

    minusBtn.addEventListener("click",()=>{

        if(quantity>1){

            quantity--;

            updateQuantity();

        }

    });

}

if(plusBtn){

    plusBtn.addEventListener("click",()=>{

        quantity++;

        updateQuantity();

    });

}

updateQuantity();



/* ==================================================
                PRODUCT DATA
==================================================*/

function getCurrentProduct(){

    return{

        id:1,

        name:"KAARU Beyond Basic",

        subtitle:"Premium Ultra-fine Voile",

        color:selectedColor ?

        selectedColor.textContent :

        "Ivory",

        quantity:quantity,

        price:189000,

        image:mainImage ?

        mainImage.src :

        ""

    };

}
/* ==================================================
                    CART
==================================================*/

const addCartBtn = document.getElementById("addCartBtn");

const buyNowBtn = document.getElementById("buyNowBtn");

const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(

    localStorage.getItem("kaaruCart")

) || [];



/* ==================================================
                UPDATE CART BADGE
==================================================*/

function updateCartBadge(){

    if(!cartCount) return;

    const total = cart.reduce((sum,item)=>{

        return sum + item.quantity;

    },0);

    cartCount.textContent = total;

}



/* ==================================================
                SAVE CART
==================================================*/

function saveCart(){

    localStorage.setItem(

        "kaaruCart",

        JSON.stringify(cart)

    );

    updateCartBadge();

}



/* ==================================================
                ADD TO CART
==================================================*/

function addToCart(showAlert=true){

    const product = getCurrentProduct();

    const existing = cart.find(item=>

        item.id===product.id &&

        item.color===product.color

    );

    if(existing){

        existing.quantity += product.quantity;

    }

    else{

        cart.push(product);

    }

    saveCart();

    if(showAlert){

        showToast(

            "Produk berhasil ditambahkan ke keranjang."

        );

    }

}



/* ==================================================
                BUTTON EVENT
==================================================*/

if(addCartBtn){

    addCartBtn.addEventListener("click",()=>{

        addToCart(true);

    });

}



/* ==================================================
                BUY NOW
==================================================*/

if(buyNowBtn){

    buyNowBtn.addEventListener("click",()=>{

        addToCart(false);

        window.location.href="../checkout/index.html";

    });

}
/* ==================================================
                    TOAST
==================================================*/

function showToast(message){

    let toast = document.querySelector(".toast");

    if(!toast){

        toast = document.createElement("div");

        toast.className="toast";

        document.body.appendChild(toast);

    }

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2600);

}
/* ==================================================
                FAQ ACCORDION
==================================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const question = item.querySelector(".faq-question");

    if(!question) return;

    question.addEventListener("click",()=>{

        faqItems.forEach(faq=>{

            if(faq!==item){

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});
/* ==================================================
                NEWSLETTER
==================================================*/

const newsletter = document.querySelector(".newsletter-form");

if(newsletter){

    newsletter.addEventListener("submit",(e)=>{

        e.preventDefault();

        showToast(

            "Terima kasih telah berlangganan."

        );

        newsletter.reset();

    });

}
/* ==================================================
                    INIT
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    updateQuantity();

    updateCartBadge();

    renderCart();

});
/* ==================================================
                SCROLL REVEAL
==================================================*/

const revealElements = document.querySelectorAll(

    ".fade-up"

);

if(revealElements.length){

    const observer = new IntersectionObserver(

        (entries)=>{

            entries.forEach((entry)=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold:.15

        }

    );

    revealElements.forEach((el)=>{

        observer.observe(el);

    });

}



/* ==================================================
            IMAGE FADE LOADING
==================================================*/

document.querySelectorAll("img").forEach((image)=>{

    image.addEventListener("load",()=>{

        image.classList.add("loaded");

    });

});



/* ==================================================
            CLOSE MENU WITH ESC
==================================================*/

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        closeMenu();

    }

});



/* ==================================================
        CLOSE MENU WHEN RESIZE
==================================================*/

window.addEventListener("resize",()=>{

    if(window.innerWidth>=992){

        closeMenu();

    }

});



/* ==================================================
            ACTIVE NAVIGATION
==================================================*/

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(

    ".desktop-nav a, .mobile-nav a"

);

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach((section)=>{

        const top = section.offsetTop - 140;

        const height = section.offsetHeight;

        if(window.scrollY>=top){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach((link)=>{

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if(

            href &&

            href.includes("#"+current)

        ){

            link.classList.add("active");

        }

    });

});



/* ==================================================
                BACK TO TOP
==================================================*/

const backTop = document.getElementById("backToTop");

if(backTop){

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            backTop.classList.add("show");

        }

        else{

            backTop.classList.remove("show");

        }

    });

    backTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ==================================================
                    CART DRAWER
==================================================*/

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartBtn = document.getElementById("closeCart");
const continueShoppingBtn = document.getElementById("continueShopping");

function openCart(){

    if(!cartDrawer || !cartOverlay) return;

    renderCart();

    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}

function closeCart(){

    if(!cartDrawer || !cartOverlay) return;

    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}

cartBtn?.addEventListener("click", openCart);

closeCartBtn?.addEventListener("click", closeCart);

cartOverlay?.addEventListener("click", closeCart);

continueShoppingBtn?.addEventListener("click", closeCart);
/* ==================================================
                RENDER CART
==================================================*/

const cartItems = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const drawerCount = document.getElementById("drawerCount");

function formatPrice(price){

    return "Rp" + price.toLocaleString("id-ID");

}

function renderCart(){

    if(!cartItems) return;

    cartItems.innerHTML = "";

    if(cart.length === 0){

        cartItems.innerHTML = `

        <div class="empty-cart">

            <i class="fa-solid fa-bag-shopping"></i>

            <h3>Your Shopping Bag is Empty</h3>

            <p>

                Explore our premium collection and

                discover your favorite hijab.

            </p>

        </div>

        `;

        cartSubtotal.textContent = "Rp0";

        drawerCount.textContent = "0";

        updateCartBadge();

        return;

    }

    let subtotal = 0;

    let totalItem = 0;

    cart.forEach((item,index)=>{

        subtotal += item.price * item.quantity;

        totalItem += item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div class="cart-item-image">

                <img src="${item.image}" alt="${item.name}">

            </div>

            <div class="cart-item-content">

                <h4>${item.name}</h4>

                <p>${item.color}</p>

                <div class="cart-price">

                    ${formatPrice(item.price)}

                </div>

                <div class="cart-qty">

                    <button onclick="decreaseQty(${index})">

                        −

                    </button>

                    <span>

                        ${item.quantity}

                    </span>

                    <button onclick="increaseQty(${index})">

                        +

                    </button>

                </div>

                <div

                    class="remove-item"

                    onclick="removeItem(${index})">

                    Remove

                </div>

            </div>

        </div>

        `;

    });

    drawerCount.textContent = totalItem;

    cartSubtotal.textContent = formatPrice(subtotal);

    updateCartBadge();

}
/* ==================================================
                QUANTITY
==================================================*/

function increaseQty(index){

    cart[index].quantity++;

    saveCart();

    renderCart();

}

function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    saveCart();

    renderCart();

}
/* ==================================================
                REMOVE ITEM
==================================================*/

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    renderCart();

    showToast(

        "Produk dihapus dari keranjang."

    );

}
/* ==================================================
                CHECKOUT
==================================================*/

const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn?.addEventListener("click",()=>{

    if(cart.length===0){

        showToast(

            "Keranjang masih kosong."

        );

        return;

    }

    window.location.href="../checkout/index.html";

});
/* ==================================================
            STORAGE SYNC
==================================================*/

window.addEventListener("storage",()=>{

    cart = JSON.parse(

        localStorage.getItem("kaaruCart")

    ) || [];

    updateCartBadge();

    renderCart();

});


/* ==================================================
                PAGE LOADER
==================================================*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});



/* ==================================================
                WEBSITE READY
==================================================*/

console.log(

`

██████╗

██╗  ██╗

███████║

██╔══██║

██║  ██║

╚═╝  ╚═╝



KAARU BEYOND BASIC

Premium Product Page

`

);

console.log("✅ Navbar Ready");

console.log("✅ Mobile Menu Ready");

console.log("✅ Gallery Ready");

console.log("✅ Thumbnail Ready");

console.log("✅ Color Swatch Ready");

console.log("✅ Quantity Ready");

console.log("✅ Cart Ready");

console.log("✅ FAQ Ready");

console.log("✅ Newsletter Ready");

console.log("✅ Reveal Animation Ready");

console.log("✅ Website Ready");