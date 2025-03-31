document.addEventListener("DOMContentLoaded", function () {
    const adminLoginBtn = document.getElementById("admin-login-btn");
    const usernameInput = document.getElementById("admin-username");
    const passwordInput = document.getElementById("admin-password");
    const loginError = document.getElementById("login-error");

    const adminCredentials = {
        username: "admin",
        password: "swift123"
    };

    adminLoginBtn.addEventListener("click", function () {
        const enteredUsername = usernameInput.value.trim();
        const enteredPassword = passwordInput.value.trim();

        if (enteredUsername === adminCredentials.username && enteredPassword === adminCredentials.password) {
            localStorage.setItem("adminLoggedIn", "true");
            window.location.href = "admin.html";
        } else {
            loginError.textContent = "Invalid username or password!";
        }
    });
});
