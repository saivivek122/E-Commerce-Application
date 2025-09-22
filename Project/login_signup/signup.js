let firstName=document.getElementById("firstName");
let lastName=document.getElementById("lastName");
let email=document.getElementById("email");
let password=document.getElementById("password");
let confirmPassword=document.getElementById("confirmPassword");
let message=document.getElementById("message");
let signupButton=document.getElementById("signup")
let redirect=document.getElementById("redirectToLogin")

let signupUserArray=JSON.parse(localStorage.getItem("signupUser"))||[];
console.log(signupUserArray.some((item)=>item.email=="sai@gmail.com"))
function signupUser(event){
    event.preventDefault();
    if(firstName.value==="" ||lastName.value=="" ||email.value==="" ||password.value===""||confirmPassword.value===""){
        message.textContent="All fields are required!"
        message.style.color="red"
    
        return;
    }
    else {
        if(password.value===confirmPassword.value && !signupUserArray.some((item)=>item.email==email.value)){
            let userObj={
                firstName:firstName.value,
                lastName:lastName.value,
                email:email.value,
                password:password.value,
                confirmPassword:confirmPassword.value,
                userProfile:[]
            }
            signupUserArray.push(userObj);
            localStorage.setItem("signupUser",JSON.stringify(signupUserArray))
            message.textContent="Signup Success";
            message.style.color="green"
            firstName.value="";
            lastName.value="";
            email.value="";
            password.value="";
            confirmPassword.value="";
        }
        else{
            message.textContent="Passwords must match! or email exists"
            message.style.color="red"
        }

    }
   
}

function redirectToLogin(){
    window.location.href="./login.html"
}
redirect.addEventListener("click",redirectToLogin)

signupButton.addEventListener("click",signupUser)