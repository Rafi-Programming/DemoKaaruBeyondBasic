/* ==================================================
   KAARU PRODUCT PAGE
   SCRIPT.JS
==================================================*/

/* ==========================================
   PRODUCT GALLERY
========================================== */

const mainImage = document.getElementById("mainProductImage");
const thumbnails = document.querySelectorAll(".thumb");

if (mainImage && thumbnails.length) {

    thumbnails.forEach((thumb) => {

        thumb.addEventListener("click", () => {

            thumbnails.forEach(item => item.classList.remove("active"));

            thumb.classList.add("active");

            mainImage.src = thumb.dataset.image;

        });

    });

}

/* ==========================================
   COLOR SWATCH
========================================== */

const swatches = document.querySelectorAll(".color-swatch");
const selectedColor = document.querySelector("#selectedColor strong");

if (swatches.length) {

    swatches.forEach((swatch) => {

        swatch.addEventListener("click", () => {

            swatches.forEach(item => item.classList.remove("active"));

            swatch.classList.add("active");

            if (selectedColor) {

                selectedColor.textContent = swatch.dataset.color;

            }

            if (mainImage) {

                mainImage.src = swatch.dataset.image;

            }

        });

    });

}

/* ==========================================
   QUANTITY
========================================== */

const qty = document.getElementById("qtyValue");
const plus = document.getElementById("plusQty");
const minus = document.getElementById("minusQty");

let quantity = 1;

function updateQty() {

    if (qty) {

        qty.textContent = quantity;

    }

}

if (plus) {

    plus.addEventListener("click", () => {

        quantity++;

        updateQty();

    });

}

if (minus) {

    minus.addEventListener("click", () => {

        if (quantity > 1) {

            quantity--;

            updateQty();

        }

    });

}

/* ==========================================
   FAQ ACCORDION
========================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach((faq) => {

            if (faq !== item) {

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});

/* ==========================================
   CART
========================================== */

const addCartBtn = document.getElementById("addCartBtn");
const buyNowBtn = document.getElementById("buyNowBtn");
const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(localStorage.getItem("kaaruCart")) || [];

/* Badge */

function updateCartBadge() {

    if (!cartCount) return;

    const totalQty = cart.reduce((total, item) => {

        return total + item.quantity;

    }, 0);

    cartCount.textContent = totalQty;

}

updateCartBadge();

/* Save */

function saveCart() {

    localStorage.setItem(

        "kaaruCart",

        JSON.stringify(cart)

    );

    updateCartBadge();

}

/* Product Object */

function getCurrentProduct() {

    return {

        id: 1,

        name: "KAARU Beyond Basic",

        subtitle: "Premium Ultra-fine Voile",

        color: selectedColor ? selectedColor.textContent : "Ivory",

        quantity: quantity,

        price: 189000,

        image: mainImage ? mainImage.src : ""

    };

}

/* Add Cart */

function addToCart(showAlert = true) {

    const product = getCurrentProduct();

    const existing = cart.find(item =>

        item.id === product.id &&

        item.color === product.color

    );

    if (existing) {

        existing.quantity += product.quantity;

    }

    else {

        cart.push(product);

    }

    saveCart();

    if (showAlert) {

        alert("Produk berhasil ditambahkan ke keranjang.");

    }

}

if (addCartBtn) {

    addCartBtn.addEventListener("click", () => {

        addToCart(true);

    });

}

/* ==========================================
   BUY NOW
========================================== */

if (buyNowBtn) {

    buyNowBtn.addEventListener("click", () => {

        addToCart(false);

        window.location.href = "../checkout/index.html";

    });

}

/* ==========================================
   NAVBAR SCROLL
========================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    }

    else {

        header.classList.remove("scrolled");

    }

});

/* ==========================================
   PAGE LOAD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    updateQty();

    updateCartBadge();

});
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
