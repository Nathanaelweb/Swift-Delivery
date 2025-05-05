document.addEventListener("DOMContentLoaded", function () {  
    const loginForm = document.getElementById("login-form");  
    const signupForm = document.getElementById("signup-form");  
    const formTitle = document.getElementById("form-title");  
  
    const showSignup = document.getElementById("show-signup");  
    const showLogin = document.getElementById("show-login");  
  
    showSignup.addEventListener("click", function (e) {  
        e.preventDefault();  
        loginForm.classList.add("hidden");  
        signupForm.classList.remove("hidden");  
        formTitle.innerText = "Sign Up";  
    });  
  
    showLogin.addEventListener("click", function (e) {  
        e.preventDefault();  
        signupForm.classList.add("hidden");  
        loginForm.classList.remove("hidden");  
        formTitle.innerText = "Login";  
    });  
  
    // Handle login form submission
    loginForm.addEventListener("submit", function (e) {  
        e.preventDefault();  

        // You can add further validation if needed
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        if (email && password) {
            alert("Login successful!");  
            window.location.href = "index.html";  // Redirect to index.html
        } else {
            alert("Please enter valid login credentials!");
        }
    });  
  
    // Handle signup form submission
    signupForm.addEventListener("submit", function (e) {  
        e.preventDefault();  

        // You can add further validation if needed
        const name = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        if (name && email && password) {
            alert("Signup successful!");  
            window.location.href = "index.html";  // Redirect to index.html
        } else {
            alert("Please fill out all the fields correctly!");
        }
    });  
});
