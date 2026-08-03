/* ==================================================
                KAARU ABOUT PAGE
                SCRIPT.JS
==================================================*/



/* ==================================================
                MOBILE MENU
==================================================*/

const menuBtn = document.getElementById("menuBtn");

const closeMenuBtn = document.getElementById("closeMenu");

const mobileMenu = document.getElementById("mobileMenu");

const overlay = document.getElementById("overlay");



function openMenu(){

    mobileMenu.classList.add("active");

    overlay.classList.add("active");

    document.body.style.overflow = "hidden";

}



function closeMenu(){

    mobileMenu.classList.remove("active");

    overlay.classList.remove("active");

    document.body.style.overflow = "";

}



if(menuBtn){

    menuBtn.addEventListener(

        "click",

        openMenu

    );

}



if(closeMenuBtn){

    closeMenuBtn.addEventListener(

        "click",

        closeMenu

    );

}



if(overlay){

    overlay.addEventListener(

        "click",

        closeMenu

    );

}



document

.querySelectorAll(".mobile-nav a")

.forEach(link=>{

    link.addEventListener(

        "click",

        closeMenu

    );

});
/* ==================================================
                STICKY NAVBAR
==================================================*/

const header = document.querySelector(".header");



window.addEventListener(

    "scroll",

    ()=>{

        if(window.scrollY > 40){

            header.classList.add("scrolled");

        }

        else{

            header.classList.remove("scrolled");

        }

    }

);
/* ==================================================
                STORY GALLERY
==================================================*/

const mainImage =

document.getElementById(

"mainStoryImage"

);



const thumbnails =

document.querySelectorAll(

".thumb"

);



thumbnails.forEach(

thumb=>{

thumb.addEventListener(

"click",

()=>{

const image=

thumb.dataset.image;



if(mainImage.src.includes(image))

return;



thumbnails.forEach(btn=>{

btn.classList.remove(

"active"

);

});



thumb.classList.add(

"active"

);



mainImage.style.opacity=0;



setTimeout(()=>{

mainImage.src=image;

},180);

});

});
/* ==================================================
                IMAGE LOADED
==================================================*/

if(mainImage){

mainImage.addEventListener(

"load",

()=>{

mainImage.style.opacity=1;

});

}
/* ==================================================
                REVEAL
==================================================*/

const revealElements=

document.querySelectorAll(

".fade-up"

);



const observer=

new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(

"show"

);

}

});

},

{

threshold:.15

}

);



revealElements.forEach(item=>{

observer.observe(item);

});
/* ==================================================
                BACK TO TOP
==================================================*/

const backToTop = document.getElementById("backToTop");

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
                TOAST NOTIFICATION
==================================================*/

function showToast(message){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.innerHTML=`

        <i class="fa-solid fa-circle-check"></i>

        <span>${message}</span>

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



    },2500);

}
/* ==================================================
                NEWSLETTER
==================================================*/

const newsletterForm=

document.querySelector(

".newsletter-form"

);



if(newsletterForm){

newsletterForm.addEventListener(

"submit",

function(e){

e.preventDefault();



const input=

this.querySelector(

"input"

);



if(input.value.trim()==""){

return;

}



showToast(

"Terima kasih telah bergabung bersama KAARU."

);



this.reset();

});

}
/* ==================================================
                GALLERY PARALLAX
==================================================*/

const gallery=

document.querySelector(

".gallery-wrapper"

);



window.addEventListener(

"scroll",

()=>{

if(!gallery) return;



const offset=

window.pageYOffset;



gallery.style.transform=

`translateY(${offset*0.04}px)`;

});
/* ==================================================
                IMAGE FADE
==================================================*/

document

.querySelectorAll("img")

.forEach(img=>{



if(img.complete){

img.classList.add(

"loaded"

);

}



img.addEventListener(

"load",

()=>{

img.classList.add(

"loaded"

);

});



});
/* ==================================================
                ESC CLOSE MENU
==================================================*/

document.addEventListener(

"keydown",

(e)=>{

if(

e.key==="Escape"

&&

mobileMenu.classList.contains(

"active"

)

){

closeMenu();

}

});
/* ==================================================
                ACTIVE NAV
==================================================*/

const navLinks=

document.querySelectorAll(

".desktop-nav a"

);



navLinks.forEach(link=>{

if(

link.href===window.location.href

){

link.classList.add(

"active"

);

}

});
/* ==================================================
                WEBSITE READY
==================================================*/

window.addEventListener(

"load",

()=>{

console.clear();



console.log(

"============================"

);

console.log(

"KAARU ABOUT PAGE"

);

console.log(

"============================"

);

console.log(

"Navbar Ready"

);

console.log(

"Gallery Ready"

);

console.log(

"Animations Ready"

);

console.log(

"Newsletter Ready"

);

console.log(

"Responsive Ready"

);

console.log(

"============================"

);

});
