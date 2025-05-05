document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Swift Countries and Delivery website loaded!");

    // Selecting elements
    const reviewsList = document.getElementById("reviews-list");
    const submitReviewBtn = document.getElementById("submit-review");

    if (!reviewsList || !submitReviewBtn) {
        console.error("⚠ Error: Missing review elements in HTML!");
        return;
    }

    // Fake reviews array
    const fakeReviews = [
        { name: "John Doe", text: "Swift Delivery is amazing! My package arrived on time." },
        { name: "Jane Smith", text: "Great service! The tracking system is very accurate." },
        { name: "Michael Johnson", text: "Fast and reliable delivery. Highly recommend!" },
        { name: "Emily Davis", text: "Customer support was very helpful with my order." },
        { name: "Chris Brown", text: "Had a slight delay, but overall good service." },
        { name: "Sarah Wilson", text: "Easy to use website and quick shipping!" },
        { name: "David Martinez", text: "Best delivery service I've used so far." },
        { name: "Sophia Anderson", text: "Loved the experience! Will use again." },
        { name: "James Taylor", text: "Package arrived safely. Thank you!" },
        { name: "Olivia White", text: "Professional and fast delivery service." }
    ];

    // Function to load reviews
    function loadReviews() {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

        // If no reviews exist, load fake ones
        if (reviews.length === 0) {
            console.log("ℹ No reviews found. Adding fake ones...");
            reviews = [...fakeReviews];
            localStorage.setItem("reviews", JSON.stringify(reviews));
        }

        // Clear current reviews
        reviewsList.innerHTML = "";

        // Display each review
        reviews.forEach(review => {
            if (review.name && review.text) { // Ensure valid data
                const reviewElement = document.createElement("div");
                reviewElement.classList.add("review");
                reviewElement.innerHTML = `<strong>${review.name}:</strong> ${review.text}`;
                reviewsList.appendChild(reviewElement);
            } else {
                console.error("⚠ Invalid review data:", review);
            }
        });
    }

    // Submit a new review
    submitReviewBtn.addEventListener("click", function () {
        const name = document.getElementById("customer-name").value.trim();
        const reviewText = document.getElementById("review-text").value.trim();

        if (name === "" || reviewText === "") {
            alert("⚠ Please enter both your name and review.");
            return;
        }

        const newReview = { name, text: reviewText };
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push(newReview);
        localStorage.setItem("reviews", JSON.stringify(reviews));

        // Clear input fields
        document.getElementById("customer-name").value = "";
        document.getElementById("review-text").value = "";

        loadReviews(); // Refresh reviews
    });

    loadReviews(); // Load reviews on page load
});
function increaseLikes(button) {
    let likesSpan = button.querySelector(".likes-count");
    let currentLikes = parseFloat(likesSpan.textContent.replace("k", "")) * 1000;
    
    currentLikes++; // Increase likes
    let newLikes = currentLikes >= 1000 ? (currentLikes / 1000).toFixed(1) + "k" : currentLikes; 

    likesSpan.textContent = newLikes;
}
