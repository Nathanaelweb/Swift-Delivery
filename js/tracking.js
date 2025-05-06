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
        
        "PKG637898": { 
            status: "PENDING", 
            createdAt: Date.now(), 
            receiver: "FANI", 
            FinalPackageLocation:"INDONESIA",
            ReciverEmail:"____",
            ReceiverPhone: "+62 851 378 05516",
            packageFee: "2,000,000RP", 
            sender: "JUN SEO",
            SenderCountry: "SOUTH KOREA",
            Shippmenttime:"10:00am",
            Shippmentdate:"7 May 2025"
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
                <h3>WELCOME FANI </h3>
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Receiver:</strong> ${order.receiver}</p>
                <p><strong>Final Package Location:</strong> ${order.FinalPackageLocation}</p>
                <p><strong>Reciver Email:</strong> ${order.ReciverEmail}</p>
                <p><strong>Receiver Phone:</strong> ${order.ReceiverPhone}</p>
                <p><strong>Package Delivery Fee:</strong> ${order.packageFee}</p>
                <p><strong>Sender:</strong> ${order.sender}</p>
                <p><strong>Sender Country:</strong> ${order.SenderCountry}</p>
                <p><strong>Shippment Time:</strong> ${order.Shippmenttime}</p>
                <p><strong>Shippment Date:</strong> ${order.Shippmentdate}</p>
                
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
