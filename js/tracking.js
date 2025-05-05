document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const trackingInput = document.getElementById('tracking-code');
    const trackBtn = document.getElementById('track-btn');
    const trackingResult = document.getElementById('tracking-result');

    // Get the tracking code from the URL query parameter (optional)
    const urlParams = new URLSearchParams(window.location.search);
    const trackingCode = urlParams.get('code');

    if (trackingCode) {
        trackingInput.value = trackingCode;
    }

    // Fake Orders with Additional Details
    const fakeOrders = {
        "PKG928059": { 
            status: "PENDING", 
            createdAt: Date.now(), 
            receiver: "Michel Andreina terrero", 
            FinalPackageLocation:"Dirección calle principal",
            ReciverEmail:"____",
            ReceiverPhone: "+1 829 536 7234",
            packageFee: "$100", 
            sender: "David Michael",
            SenderCountry: "United Kingdom",
        
        },
        
        "PKG967890": { 
            status: "PENDING", 
            createdAt: Date.now(), 
            receiver: "Mary Grace T Angel", 
            FinalPackageLocation:"Canada",
            ReciverEmail:"____",
            ReceiverPhone: "+1 873 456 2988",
            packageFee: "$2,000", 
            sender: "James Carlos",
            SenderCountry: "Dubai",
            Shippmenttime:"13:00pm"
        }
    };

    // Function to update order statuses based on time
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

    // Function to track an order
    function trackOrder() {
        const trackingCode = trackingInput.value.trim();

        if (trackingCode === "") {
            trackingResult.innerHTML = `<p style="color: orange;">⚠ Please enter a valid tracking code.</p>`;
            return;
        }

        updateOrderStatuses(); // Ensure statuses are updated

        // Check if the tracking code exists in the fake orders
        if (fakeOrders[trackingCode]) {
            const order = fakeOrders[trackingCode];

            // Display full order details
            trackingResult.innerHTML = `
                <h3>Package Details</h3>
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Receiver:</strong> ${order.receiver}</p>
                <p><strong>Final Package Location:</strong> ${order.FinalPackageLocation}</p>
                <p><strong>Reciver Email:</strong> ${order.ReciverEmail}</p>
                <p><strong>Receiver Phone:</strong> ${order.ReceiverPhone}</p>
                <p><strong>Package Fee:</strong> ${order.packageFee}</p>
                <p><strong>Sender:</strong> ${order.sender}</p>
                <p><strong>Sender Country:</strong> ${order.SenderCountry}</p>
                <p><strong>Shippment time:</strong> ${order.Shippmenttime}</p>
                
            `;
        } else {
            trackingResult.innerHTML = `<p style="color: red;">❌ Invalid tracking code. Please check and try again.</p>`;
        }
    }

    // Attach event listener to the "Track Order" button
    trackBtn.addEventListener("click", trackOrder);

    // If tracking code exists in URL, auto-track
    if (trackingCode) {
        trackOrder();
    }
});
