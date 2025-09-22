let productsContainer = document.getElementById("product-container");
let logoutButton = document.getElementById("logout");
let cartButton = document.getElementById("cart")
let cart = [];
let allProducts = []
let category = document.getElementById("category");
let loader = document.getElementById("loader")
let cartQuantity = document.getElementById("cart-quantity")
let inputValue = document.getElementById("search")
let productCategory = document.getElementById("product-category")
let menuButton = document.getElementById("menu")
let menuButtons = document.getElementById("menu-buttons")
let cartMenuButton = document.getElementById("cart-menu");
let logoutMenuButton = document.getElementById("logout-menu")
let cartMenuQuantity = document.getElementById("cart-menu-quantity")
let home = document.getElementById("home");
let about = document.getElementById("about")
let rangeButton = document.getElementById("range")
let rangeTextValue = document.getElementById("rangeTextValue")
let clearFilterButton = document.getElementById("clearFilter")
let menuRangeButton=document.getElementById("menuRange");
let menuRangeTextValue=document.getElementById("menuRangeTextValue")
let menuClearFilter=document.getElementById("menuClearFilter")



function searchProducts() {
    let searchValue = inputValue.value.toLowerCase().trim();
    let flatProducts = allProducts.flat();
    let userSearchedProduct = flatProducts.filter((item) =>
        item.title.toLowerCase().includes(searchValue)
    );
    if (userSearchedProduct.length === 0) {
        productsContainer.innerHTML = `<p id="noProductsFound">No products found</p>`
        productCategory.textContent = ""
    }
    else {
        productCategory.textContent = category.value
        console.log(userSearchedProduct)
        renderProducts(userSearchedProduct)
    }
}
inputValue.addEventListener("input", searchProducts)


category.addEventListener("change", () => {
    sessionStorage.setItem("selectedCategory", category.value)
    fetchProductCategory(category.value)
    productCategory.textContent = category.value

})


if (!sessionStorage.getItem("isLogin")) {
    window.location = "../login_signup/login.html"
}

async function fetchProducts() {
    try {
        loader.style.display = "block"
        let products = await fetch("https://fakestoreapi.com/products");
        let productsData = await products.json();
        // allProducts.push(productsData)
        allProducts = productsData;
        let savedCategory = sessionStorage.getItem("selectedCategory");
        if (savedCategory && savedCategory !== "All Products") {
            category.value = savedCategory;
            fetchProductCategory(savedCategory)
            productCategory.textContent = category.value;

        }
        else {
            renderProducts(productsData)
            productCategory.textContent = "All Products"

        }

    }
    catch (error) {
        console.log(error)
    }
    finally {
        loader.style.display = "none"

    }
}
fetchProducts()

function updateQuantity() {
    let total = 0;
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(currentUser)
    let users = JSON.parse(localStorage.getItem("signupUser")) || [];
    let user = users.find((item) => item.email === currentUser)
    if (user && user.userProfile) {
        user.userProfile.forEach((item) => {
            total = total + Number(item.quantity)
            console.log(item.quantity)
        })
    }
    cartQuantity.textContent = total;
    cartMenuQuantity.textContent = total

}
updateQuantity()

function renderProducts(products) {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("signupUser"));
    let user = users.find((item) => item.email == currentUser);

    productsContainer.innerHTML = ""
    products.forEach((item, index) => {
        let isThere = user ? user.userProfile.find((p) => p.id === item.id.toString()) : null

        productsContainer.innerHTML += `
        
         <div class="products">
            <div class="section-one">
                <img class="product-image"
                    src=${item.image}>
                    <div class="text">
                <h5>${item.title.slice(0, 12)}</h5>
                <h6>${item.category}</h6>
                </div>
            </div>
            <div class="section-two">
                <p>₹${item.price}</p>
                <div id="line"></div>
                <div id="buttons${item.id}">
                ${isThere
                ? `<div class="quantity-btns">
                    <button class="quantity-btn" id="add${isThere.id}" onclick="increaseQuantity('${isThere.id}')">+</button>
                    <p id="quantity${isThere.id}" class="quantity-text">${isThere.quantity}</p>
                    <button class="quantity-btn" id="sub${isThere.id}" onClick="decreaseQuantity('${isThere.id}')">-</button>
                </div>`
                : ` <button class="addToCart" id="btn${item.id}" onclick="add('${item.title.slice(0, 9)}','${item.price}','${item.id}','${item.image}')">ADD TO CART</button>`
            }
                </div>
                </div>
               
        </div>
        `

    })
    updateQuantity()

}

function fetchProductCategory(value) {
    if (value == "All Products") {
        fetchProducts()
    }
    productsContainer.innerHTML = "";
    let flatProductData = allProducts.flat();
    let filteredProducts = flatProductData.filter((item) => item.category == value);
    renderProducts(filteredProducts)

    updateQuantity()
}



function sortByPriceRange(){
     let flatProductData = allProducts.flat();
    let selectedCategory = category.value;
    let filteredByCategory = selectedCategory === "All Products"
        ? flatProductData
        : flatProductData.filter(item => item.category === selectedCategory);
    let filteredProducts = filteredByCategory.filter(item => item.price <= Number(rangeButton.value));
    console.log(filteredProducts.length)
    rangeTextValue.textContent = `Rs: ${rangeButton.value}`;
    menuRangeTextValue.textContent=`Rs: ${menuRangeButton.value}`
     if(filteredProducts.length==0){
       productCategory.textContent="No Products found in the chosen range"
    }
    else{
        productCategory.textContent = category.value;
    
    }
    renderProducts(filteredProducts);
}
function clearSortByPrice(){
    rangeButton.value = rangeButton.min;
    rangeTextValue.textContent = `Rs: ${rangeButton.value}`;
    menuRangeTextValue.textContent=`Rs: ${menuRangeButton.value}`
    fetchProductCategory(category.value);

}
rangeButton.addEventListener("input",sortByPriceRange)
clearFilterButton.addEventListener("click",clearSortByPrice);
menuRangeButton.addEventListener("input",sortByPriceRange);
menuClearFilter.addEventListener("click",clearSortByPrice)

logoutButton.addEventListener("click", logout)

function logout() {
    sessionStorage.clear("isLogin");
    window.location = "../login_signup/login.html"
}


function add(item, price, id, image) {
    console.log("add", item, price, id, image)
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("signupUser"));
    let user = users.find((item) => item.email == currentUser);
    if (user) {
        let isThere = user.userProfile.find((item) => item.id === id)
        if (isThere) {
            isThere.quantity++;
        }
        else {
            user.userProfile.push({ item: item, price: price, id: id, quantity: 1, image: image })
        }
        localStorage.setItem("signupUser", JSON.stringify(users))
    }
    let isThere = user.userProfile.find((item) => item.id === id);
    if (isThere && isThere.quantity >= 1) {
        console.log(isThere.id)
        let button = document.getElementById(`btn${isThere.id}`)
        let buttons = document.getElementById(`buttons${isThere.id}`);
        button.style.display = "none"
        console.log(buttons)
        buttons.innerHTML = `
        <div class="quantity-btns">
        <button class="quantity-btn" id="add${isThere.id}" onclick="increaseQuantity('${isThere.id}')">+</button>
         <p id="quantity${id}" class="quantity-text">${isThere.quantity}</p>
         <button class="quantity-btn"id="sub${isThere.id}" onClick="decreaseQuantity('${isThere.id}')">-</button>
         </div>
        `
    }
    updateQuantity()

}
function increaseQuantity(id) {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("signupUser"));
    let user = users.find((item) => item.email == currentUser);
    let quantity = document.getElementById(`quantity${id}`)
    if (user) {
        let isThere = user.userProfile.find((item) => item.id === id)
        if (isThere) {
            isThere.quantity++;
            quantity.textContent = isThere.quantity
        }
        else {
            user.userProfile.push({ item: item, price: price, id: id, quantity: 1 })
        }
        localStorage.setItem("signupUser", JSON.stringify(users))
    }
    updateQuantity()

}
function decreaseQuantity(id) {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("signupUser"));
    let user = users.find((item) => item.email == currentUser);
    let addBtn = document.getElementById(`add${id}`);
    let subBtn = document.getElementById(`sub${id}`);
    let quantityText = document.getElementById(`quantity${id}`)
    if (user) {
        let isThere = user.userProfile.find((item) => item.id === id)
        if (isThere && isThere.quantity != 0) {
            isThere.quantity--;
            quantityText.textContent = isThere.quantity
        }

        else {
            user.userProfile.push({ item: item, price: price, id: id, quantity: 1 })
        }
        if (isThere.quantity == 0) {





            let buttonsContainer = document.getElementById(`buttons${id}`);
            buttonsContainer.innerHTML = `<button class="addToCart" id="btn${id}" onclick="add('${isThere.item}','${isThere.price}','${isThere.id}')">ADD TO CART</button>`
            user.userProfile = user.userProfile.filter((item) => item.id !== id)
        }
        localStorage.setItem("signupUser", JSON.stringify(users))
    }
    updateQuantity()
}
cartButton.addEventListener("click", () => {
    window.location = "./cart.html"
})
cartMenuButton.addEventListener("click", () => {
    window.location = "./cart.html"
})
logoutMenuButton.addEventListener("click", logout)
menuButton.addEventListener("click", showMenu)
function showMenu() {
    console.log("menu button")
    if (menuButtons.style.display == "flex") {
        menuButtons.style.display = "none"
    }
    else {
        menuButtons.style.display = "flex"
    }

}
function toHome() {
    window.location = "../login_signup/index.html"
}
document.addEventListener("click", (event) => {
    if (menuButtons.style.display == "flex" && !menuButtons.contains(event.target) && !menuButton.contains(event.target)) {
        menuButtons.style.display = "none"
    }
})
home.addEventListener("click", toHome)
window.addEventListener("resize", () => {
    if (window.innerWidth > 576) {
        menuButtons.style.display = "none"
    }
})