let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let message = document.getElementById("message")
let loginButton = document.getElementById("login");
let signUpButton = document.getElementById("signUp")
let homeButton=document.getElementById("home")



let userObj = JSON.parse(localStorage.getItem("signupUser"))
function userLogin(event) {
    event.preventDefault();
    if (email.value === "" || password.value === "" || confirmPassword.value === "") {
        message.textContent = "All fields are required!"
        message.style.color = "red";
        return;
    }
    let doesUserThere=userObj.find((item)=>item.email===email.value);
    if(!doesUserThere){
         message.textContent="User does not exist"
         message.style.color="red"
         return;
    }
    else {
        let currentUser = userObj.filter((item) => item.email == email.value);

        if (currentUser[0].password === password.value && password.value == confirmPassword.value) {
            // isLogin=true;
            message.textContent = "Login Success!";
            message.style.color = "green"
            email.value = "";
            password.value = "";
            confirmPassword.value = "";
            console.log(currentUser[0].email)
            window.location = "../product/product.html"
            sessionStorage.setItem("isLogin", "true")
            sessionStorage.setItem("currentUser", JSON.stringify(currentUser[0].email))


        }

        else {
            message.textContent = "Password incorrect or mismatch!";
            message.style.color = "red";
        }
    }

}

function signUp(event) {
    event.preventDefault()
    window.location = "./signup.html"
    console.log("hii")
}
function home(event){
    event.preventDefault()
    console.log("Hii")
    window.location="./index.html"
}
signUpButton.addEventListener("click", signUp)

loginButton.addEventListener("click", userLogin)
homeButton.addEventListener("click",home)