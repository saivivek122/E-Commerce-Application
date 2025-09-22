let loginButton = document.getElementById("login");
let signupButton = document.getElementById("signup");
let productsNavigate = document.querySelectorAll(".each-product");
let getStarted = document.getElementById("get-started")
let menuIcon = document.getElementById("menu-icon");
let mobileMenu = document.getElementById("mobile-menu");
let navLogin = document.getElementById("nav-login");
let navSignup = document.getElementById("nav-signup")
let slides = document.getElementById("slides");
let modal=document.getElementById("modal")
let modalClose=document.getElementById("modal-close")
let container=document.getElementById("container")
let modalLogin=document.getElementById("modal-login")
let products=document.querySelectorAll(".each-product")


let arr = ["https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png", "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png","https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png","https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png"]

async function getImages(){
    let data=await fetch("https://fakestoreapi.com/products")
    let res=await data.json();
    res.forEach((item)=>{
        console.log(item.image)
        arr.push(item.image)
        console.log(arr)
    })
}
getImages()

function login() {
    let currentUser=JSON.parse(sessionStorage.getItem("currentUser"));
    if(currentUser){
        window.location="../product/product.html"
    }
    else{
    window.location = "./login.html"
    }
}

function signup() {
    window.location = "./signup.html"
}

function isUserLogin() {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(currentUser)
    let users = JSON.parse(localStorage.getItem("signupUser")) || [];
    let user = users.find((item) => item.email === currentUser)
    if (!user) {
        modal.style.display="flex"
        window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth"
        })
      container.style.opacity="0.7"
        
    }
    else {
        window.location = "../product/product.html"
    }

}
function closeModal(){
    modal.style.display="none"
     container.style.opacity="1"
}
modalClose.addEventListener("click",closeModal)
productsNavigate.forEach((item) => {
    item.addEventListener("click", isUserLogin)
})
modalLogin.addEventListener("click",login)

loginButton.addEventListener("click", login);
signupButton.addEventListener("click", signup)
navLogin.addEventListener("click", login);
navSignup.addEventListener("click", signup)
getStarted.addEventListener("click", isUserLogin)
menuIcon.addEventListener("click", () => {
    mobileMenu.style.display =
        mobileMenu.style.display === "flex" ? "none" : "flex";
});

let index = 0;
function slidImage(){
    slides.innerHTML=`<img class="slide-image" src=${arr[index]}>`
    setInterval(()=>{
        if(index<arr.length){
            slides.innerHTML=`<img class="slide-image" src=${arr[index]}>`
            index++;
        }
        else{
            index=0
        }
    },2000)
}
slidImage()

function choosedCategory(){
    products.forEach((item)=>{
        item.addEventListener("click",()=>{
            console.log(item.dataset.name)
              sessionStorage.setItem("selectedCategory", item.dataset.name)
        })
    })
}
// console.log(products)
window.addEventListener("resize", () => {
    if (window.innerWidth > 576) {
        mobileMenu.style.display = "none"
    }
})
choosedCategory()
