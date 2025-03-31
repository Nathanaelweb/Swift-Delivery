document.addEventListener("DOMContentLoaded", function () {
    const trackBtn = document.getElementById("track-btn");
    const trackingInput = document.getElementById("tracking-code");
    const trackingResult = document.getElementById("tracking-result");

    // Fake Orders with Timestamps
    const fakeOrders = {
        "123456": { status: "PENDING", createdAt: Date.now() },
        "789012": { status: "PENDING", createdAt: Date.now() },
        "345678": { status: "PENDING", createdAt: Date.now() },
        "901234": { status: "PENDING", createdAt: Date.now() },
        "567890": { status: "PENDING", createdAt: Date.now() },
        "456780": { status: "PENDING", createdAt: Date.now() },
        "986786": { status: "PENDING", createdAt: Date.now() },
        "052760": { status: "PENDING", createdAt: Date.now() },
        "448770": { status: "PENDING", createdAt: Date.now() },
        "055780": { status: "PENDING", createdAt: Date.now() },
        "958720": { status: "PENDING", createdAt: Date.now() },
        "256759": { status: "PENDING", createdAt: Date.now() },
        "655980": { status: "PENDING", createdAt: Date.now() },
        "457742": { status: "PENDING", createdAt: Date.now() },
        "751700": { status: "PENDING", createdAt: Date.now() },
        "355720": { status: "PENDING", createdAt: Date.now() },
        "556610": { status: "PENDING", createdAt: Date.now() }
    };

    // Function to update order statuses
    function updateOrderStatuses() {
        const now = Date.now();

        for (let trackingId in fakeOrders) {
            let order = fakeOrders[trackingId];
            let timeElapsed = (now - order.createdAt) / (1000 * 60 * 60); // Convert ms to hours

            if (timeElapsed >= 43) {
                order.status = "DELIVERED";
            } else if (timeElapsed >= 2) {
                order.status = "SHIPPED";
            }
        }
    }

    // Track Order Function
    trackBtn.addEventListener("click", function () {
        const trackingCode = trackingInput.value.trim();
        updateOrderStatuses(); // Update before checking status

        if (trackingCode === "") {
            trackingResult.innerHTML = "⚠ Please enter a valid tracking code.";
            return;
        }

        if (fakeOrders[trackingCode]) {
            trackingResult.innerHTML = `📦 Order Status: <strong>${fakeOrders[trackingCode].status}</strong>`;
        } else {
            trackingResult.innerHTML = "❌ Invalid tracking code. Please check and try again.";
        }
    });
});
