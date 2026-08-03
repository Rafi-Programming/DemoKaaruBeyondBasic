/* ==================================================
                KAARU COLLECTION
                SCRIPT.JS
==================================================*/



/* ==================================================
                ELEMENT
==================================================*/

const body = document.body;

const header = document.querySelector(".header");

const overlay = document.getElementById("overlay");

const mobileMenu = document.getElementById("mobileMenu");

const menuBtn = document.getElementById("menuBtn");

const closeMenu = document.getElementById("closeMenu");

const cartDrawer = document.getElementById("cartDrawer");

const cartOverlay = document.getElementById("cartOverlay");

const cartBtn = document.getElementById("cartBtn");

const closeCart = document.getElementById("closeCart");

const backToTop = document.getElementById("backToTop");



/* ==================================================
                MOBILE MENU
==================================================*/

function openMenu(){

    mobileMenu.classList.add("active");

    overlay.classList.add("active");

    body.style.overflow="hidden";

}

function closeMobileMenu(){

    mobileMenu.classList.remove("active");

    overlay.classList.remove("active");

    body.style.overflow="";

}

if(menuBtn){

    menuBtn.addEventListener("click",openMenu);

}

if(closeMenu){

    closeMenu.addEventListener("click",closeMobileMenu);

}

if(overlay){

    overlay.addEventListener("click",closeMobileMenu);

}

document.querySelectorAll(".mobile-nav a").forEach(link=>{

    link.addEventListener("click",()=>{

        closeMobileMenu();

    });

});



/* ==================================================
                CART DRAWER
==================================================*/

function openCart(){

    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

    body.style.overflow="hidden";

}

function closeShoppingCart(){

    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

    body.style.overflow="";

}

if(cartBtn){

    cartBtn.addEventListener("click",openCart);

}

if(closeCart){

    closeCart.addEventListener("click",closeShoppingCart);

}

if(cartOverlay){

    cartOverlay.addEventListener("click",closeShoppingCart);

}



/* ==================================================
                STICKY NAVBAR
==================================================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }

});



/* ==================================================
                BACK TO TOP
==================================================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        backToTop.classList.add("show");

    }

    else{

        backToTop.classList.remove("show");

    }

});

if(backToTop){

    backToTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}



/* ==================================================
                REVEAL ANIMATION
==================================================*/

const reveals=document.querySelectorAll(".fade-up");

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:.15

});

reveals.forEach(item=>{

    observer.observe(item);

});
/* ==================================================
                SHOPPING CART
==================================================*/

let cart = JSON.parse(

    localStorage.getItem("kaaruCart")

) || [];

const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const drawerCount = document.getElementById("drawerCount");

const subtotal = document.getElementById("cartSubtotal");



/* ==================================================
                FORMAT RUPIAH
==================================================*/

function formatRupiah(number){

    return "Rp" +

    number.toLocaleString("id-ID");

}



/* ==================================================
                SAVE CART
==================================================*/

function saveCart(){

    localStorage.setItem(

        "kaaruCart",

        JSON.stringify(cart)

    );

}



/* ==================================================
                UPDATE BADGE
==================================================*/

function updateBadge(){

    const total = cart.reduce(

        (sum,item)=>sum+item.quantity,

        0

    );

    if(cartCount){

        cartCount.textContent=total;

    }

    if(drawerCount){

        drawerCount.textContent=total;

    }

}



/* ==================================================
                SUBTOTAL
==================================================*/

function updateSubtotal(){

    const total = cart.reduce(

        (sum,item)=>{

            return sum+

            (item.price*item.quantity);

        },

        0

    );

    if(subtotal){

        subtotal.textContent=

        formatRupiah(total);

    }

}



/* ==================================================
                RENDER CART
==================================================*/

function renderCart(){

    if(!cartItems) return;

    if(cart.length===0){

        cartItems.innerHTML=`

        <div class="empty-cart">

            <i class="fa-solid fa-bag-shopping"></i>

            <h3>Shopping Bag Empty</h3>

            <p>

                Belum ada produk yang ditambahkan.

            </p>

        </div>

        `;

        updateBadge();

        updateSubtotal();

        return;

    }

    cartItems.innerHTML="";



    cart.forEach((item,index)=>{

        cartItems.innerHTML +=`

        <div class="cart-item">

            <img

                src="${item.image}"

                alt="${item.name}">

            <div class="cart-info">

                <h4>

                    ${item.name}

                </h4>

                <p>

                    ${item.color}

                </p>

                <div class="cart-price">

                    ${formatRupiah(item.price)}

                </div>

                <p>

                    Qty : ${item.quantity}

                </p>

                <div

                    class="remove-item"

                    data-index="${index}">

                    Remove

                </div>

            </div>

        </div>

        `;

    });

    updateBadge();

    updateSubtotal();

    bindRemoveButton();

}
/* ==================================================
                REMOVE ITEM
==================================================*/

function bindRemoveButton(){

    document

    .querySelectorAll(".remove-item")

    .forEach(btn=>{

        btn.onclick=()=>{

            const index=

            btn.dataset.index;

            cart.splice(index,1);

            saveCart();

            renderCart();

        };

    });

}



/* ==================================================
                ADD TO CART
==================================================*/

const addButtons=

document.querySelectorAll(".add-cart");

addButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const product={

            id:button.dataset.id,

            name:button.dataset.name,

            color:button.dataset.color,

            image:button.dataset.image,

            price:Number(button.dataset.price),

            quantity:1

        };



        const existing=

        cart.find(item=>

            item.id===product.id &&

            item.color===product.color

        );



        if(existing){

            existing.quantity++;

        }

        else{

            cart.push(product);

        }



        saveCart();

        renderCart();



        button.textContent="Added ✓";



        setTimeout(()=>{

            button.textContent=

            "Add to Cart";

        },1200);

    });

});



/* ==================================================
                INIT
==================================================*/

renderCart();
/* ==================================================
                CHECKOUT WHATSAPP
==================================================*/

const checkoutBtn = document.getElementById("checkoutBtn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click",()=>{

        if(cart.length===0){

            showToast(

                "Keranjang masih kosong."

            );

            return;

        }

        let message="Halo KAARU,%0A%0ASaya ingin melakukan pemesanan:%0A%0A";

        let total=0;

        cart.forEach((item,index)=>{

            message +=

            `${index+1}. ${item.name}%0A`;

            message +=

            `• Warna : ${item.color}%0A`;

            message +=

            `• Qty : ${item.quantity}%0A`;

            message +=

            `• Harga : ${formatRupiah(item.price)}%0A%0A`;

            total += item.price * item.quantity;

        });

        message +=

        `Total : ${formatRupiah(total)}`;

        // Ganti dengan nomor WhatsApp toko
        const phone="6281234567890";

        window.open(

            `https://wa.me/${phone}?text=${message}`,

            "_blank"

        );

    });

}
/* ==================================================
                TOAST NOTIFICATION
==================================================*/

function showToast(text){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.innerHTML=`

        <i class="fa-solid fa-circle-check"></i>

        <span>${text}</span>

    `;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },50);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },300);

    },2200);

}
/* ==================================================
                NEWSLETTER
==================================================*/

const newsletter=document.querySelector(

".newsletter-form"

);

if(newsletter){

    newsletter.addEventListener(

    "submit",

    function(e){

        e.preventDefault();

        this.reset();

        showToast(

        "Terima kasih telah berlangganan."

        );

    });

}
/* ==================================================
                SEARCH
==================================================*/

const searchBtn=document.getElementById(

"searchBtn"

);

if(searchBtn){

    searchBtn.addEventListener("click",()=>{

        showToast(

            "Fitur pencarian segera hadir."

        );

    });

}
/* ==================================================
                RIPPLE EFFECT
==================================================*/

document.querySelectorAll(

".btn-primary,.add-cart"

).forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=this.getBoundingClientRect();

        ripple.style.left=

        e.clientX-rect.left+"px";

        ripple.style.top=

        e.clientY-rect.top+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});
/* ==================================================
                WEBSITE READY
==================================================*/

window.addEventListener("load",()=>{

    console.log(

        "✅ Collection Page Ready"

    );

    console.log(

        "✅ Navbar Ready"

    );

    console.log(

        "✅ Mobile Menu Ready"

    );

    console.log(

        "✅ Shopping Cart Ready"

    );

    console.log(

        "✅ WhatsApp Checkout Ready"

    );

    console.log(

        "✅ Animation Ready"

    );

});
