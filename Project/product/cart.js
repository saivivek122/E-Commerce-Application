let productContainer = document.getElementById("products")
let cartItemsText = document.getElementById("cartItemsText")
let backButton = document.getElementById("back")
let total = 0;

function renderCart() {
  
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("signupUser"));
    let user = users.find((item) => item.email == currentUser);


    let totalProducts = 0
    if (!sessionStorage.getItem("isLogin")) {
        window.location = "../login_signup/login.html"
    }



    if (user) {
        let cartText = document.getElementById("cartText")
        let products = document.getElementById("products")
        productContainer.innerHTML = ""
        let currentUserProfile = user.userProfile;

        let flat = currentUserProfile.flat();
        if (flat.length === 0) {
            if (flat.length === 0) {
                products.innerHTML = ""
                cartText.textContent = "No products found"

            }
        }

        flat.forEach((item, index) => {
            total=total+item.quantity*item.price
            totalProducts = totalProducts + item.quantity

            productContainer.innerHTML += `
    <div class="left">
                    <img id="productImage" src="${item.image}">
                    <div class="textTwo">
                        <h5>${item.item.slice(0, 12)}</h5>
                        <p>${item.quantity}</p>
                    </div>
                    <div class="buttons">
                         <button class="quantity-btn" id="add${item.id}" onclick="increaseQuantity('${item.item}','${item.price}','${item.id}')">+</button>
               <button class="quantity-btn"id="sub${item.id}" onclick="decreaseQuantity('${item.item}','${item.price}','${item.id}')">-</button>        
                    </div>
                    <p id="productPrice"><span>₹</span> ${(item.quantity * item.price).toFixed(2)}</p>
                   
                </div>
       
            </div>
    
    `
        })

        if(flat.length>0){
            productContainer.innerHTML+=`
            <div class="cart-buy">
            <h3>Total:₹ ${total.toFixed(2)}</h3>
            <button id="buy" class="buy" onclick="buy(${total.toFixed(2)})">Proceed Buy</button>
            </div>
            `
           
        }

    }

    if (totalProducts >= 1) {
        cartItemsText.textContent = `You have ${totalProducts} items in your cart`
        
    }
    else {
        cartItemsText.textContent = `You have no product items in your cart`
    }

}
renderCart()



function increaseQuantity(item, price, id) {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("signupUser"));
    let user = users.find((item) => item.email == currentUser);

    if (user) {
        let isThere = user.userProfile.find((item) => item.id === id)
        if (isThere) {
            isThere.quantity++;

        }
        else {
            user.userProfile.push({ item: item, price: price, id: id, quantity: 1 })
        }
        localStorage.setItem("signupUser", JSON.stringify(users))
        renderCart()
    }


}


function decreaseQuantity(item, price, id) {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("signupUser"));
    let user = users.find((item) => item.email == currentUser);

    if (user) {
        let isThere = user.userProfile.find((item) => item.id === id)
        if (isThere && isThere.quantity != 0) {
            isThere.quantity--;

        }

        else {
            user.userProfile.push({ item: item, price: price, id: id, quantity: 1 })
        }
        if (isThere.quantity == 0) {


            user.userProfile = user.userProfile.filter((item) => item.id !== id)
        }
        localStorage.setItem("signupUser", JSON.stringify(users))
        renderCart()
    }
}

function moveBack() {
    window.location = "./product.html"
}
backButton.addEventListener("click", moveBack)

function buy(price){
    alert(`Check out with ₹ ${price}`)
}