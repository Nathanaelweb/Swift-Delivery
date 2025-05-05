document.addEventListener("DOMContentLoaded", function () {
    const orderList = document.getElementById("order-list");
    const logoutBtn = document.getElementById("logout-btn");

    // Check if admin is logged in
    if (!localStorage.getItem("adminLoggedIn")) {
        alert("Access Denied! Please log in as Admin.");
        window.location.href = "admin-login.html"; // Redirect to admin login
    }

    // Fetch orders from localStorage (replace with database call if needed)
    function loadOrders() {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orderList.innerHTML = ""; // Clear table before inserting new data

        orders.forEach((order, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.trackingId}</td>
                <td>${order.customerName}</td>
                <td>${order.status}</td>
                <td>
                    <select class="status-update" data-index="${index}">
                        <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
                        <option value="Shipped" ${order.status === "Shipped" ? "selected" : ""}>Shipped</option>
                        <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
                    </select>
                </td>
                <td>
                    <button class="delete-order" data-index="${index}">Delete</button>
                </td>
            `;
            orderList.appendChild(row);
        });
    }

    // Event listener for updating order status
    orderList.addEventListener("change", function (event) {
        if (event.target.classList.contains("status-update")) {
            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            let index = event.target.getAttribute("data-index");
            orders[index].status = event.target.value;
            localStorage.setItem("orders", JSON.stringify(orders));
            alert("Order status updated!");
        }
    });

    // Event listener for deleting orders
    orderList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-order")) {
            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            let index = event.target.getAttribute("data-index");
            orders.splice(index, 1); // Remove the order from the array
            localStorage.setItem("orders", JSON.stringify(orders));
            alert("Order deleted!");
            loadOrders(); // Refresh the order list
        }
    });

    // Logout button
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("adminLoggedIn"); // Remove admin login flag
        alert("Logged out successfully!");
        window.location.href = "admin-login.html"; // Redirect to login page
    });

    // Load orders on page load
    loadOrders();
});
