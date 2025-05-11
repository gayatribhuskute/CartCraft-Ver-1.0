// Function to load Navbar
function loadNavbar() {
    document.getElementById("navbar").innerHTML = `
        <nav class="navbar navbar-expand-lg fixed-top" style="background-color: #f9f7f2;">
            <div class="container">
                <a class="navbar-brand fw-bold d-flex align-items-center" href="index.html">
                    <img src="images/logo.jpg" alt="GBStore logo" width="40" height="40" class="me-2"> 🛍️GBSTORE
                </a>
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
                        <li class="nav-item"><a class="nav-link" href="wishlist.html">Wishlist</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
                    </ul>

                    <!-- Search Bar -->
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    <!-- Cart & Login/Register Buttons -->
                    <a href="cart.html" class="btn btn-dark">
                        <i class="fas fa-shopping-cart"></i> Cart
                    </a>
                    <a href="login.html" class="btn btn-primary">Login / Register</a>
                    <a href="admin-login.html" class="btn btn-primary">admin-login</a>
                </div>
            </div>
        </nav>
    `;
}

// Function to load Footer
function loadFooter() {
    document.getElementById("footer").innerHTML = `
        <footer class="bg-dark text-white text-center p-4">
            <p>© 2025 🛍️GBSTORE. All Rights Reserved.</p>
        </footer>
    `;
}

// Load Navbar & Footer on all pages
document.addEventListener("DOMContentLoaded", function () {
    loadNavbar();
    loadFooter();
});

document.addEventListener("DOMContentLoaded", function () {
    updateCartTotal(); // Calculate total on page load

    // Select all quantity input fields
    document.querySelectorAll(".quantity").forEach(input => {
        input.addEventListener("input", updateItemTotal);
    });

    // Select all remove buttons
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", removeItem);
    });

    function updateItemTotal(event) {
        let quantityInput = event.target;
        let cartItem = quantityInput.closest(".cart-item");
        let priceElement = cartItem.querySelector(".text-muted"); // Price from the product
        let totalPriceElement = cartItem.querySelector(".total-price"); // Total price field

        let price = parseFloat(priceElement.textContent.replace("$", "").replace(",", ""));
        let quantity = parseInt(quantityInput.value);

        let newTotal = price * quantity;
        totalPriceElement.textContent = `$${newTotal.toLocaleString()}`; // Update total price

        updateCartTotal(); // Update the cart total
    }

    function removeItem(event) {
        let cartItem = event.target.closest(".cart-item");
        cartItem.remove(); // Remove item from DOM
        updateCartTotal(); // Recalculate total
    }

    function updateCartTotal() {
        let subtotal = 0;

        document.querySelectorAll(".cart-item").forEach(item => {
            let totalPriceElement = item.querySelector(".total-price");
            let totalPrice = parseFloat(totalPriceElement.textContent.replace("$", "").replace(",", ""));
            subtotal += totalPrice;
        });

        let tax = subtotal * 0.05; // 5% tax
        let grandTotal = subtotal + tax;

        document.getElementById("subtotal").textContent = `$${subtotal.toLocaleString()}`;
        document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
        document.getElementById("total").textContent = `$${grandTotal.toLocaleString()}`;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    loadWishlist(); // Load wishlist when page loads

    // Add to Wishlist Button Click Event
    document.querySelectorAll(".add-to-wishlist").forEach(button => {
        button.addEventListener("click", function () {
            let product = {
                name: this.dataset.name,
                price: this.dataset.price,
                image: this.dataset.image
            };

            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

            // Check if product already exists
            if (!wishlist.some(item => item.name === product.name)) {
                wishlist.push(product);
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                alert("Added to Wishlist! ❤️");
            } else {
                alert("Already in Wishlist!");
            }
        });
    });

    // Load Wishlist Items on Wishlist Page
    function loadWishlist() {
        if (document.getElementById("wishlist-container")) {
            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            let container = document.getElementById("wishlist-container");

            if (wishlist.length === 0) {
                container.innerHTML = "<p>Your wishlist is empty.</p>";
                return;
            }

            container.innerHTML = wishlist.map((item, index) => `
                <div class="wishlist-item">
                    <img src="${item.image}" width="100">
                    <h5>${item.name}</h5>
                    <p>₹${item.price}</p>
                    <button class="btn btn-success add-to-cart" 
                            data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">
                        🛒 Add to Cart
                    </button>
                    <button class="btn btn-danger remove-wishlist" data-index="${index}">
                        ❌ Remove
                    </button>
                </div>
            `).join("");

            // Add event listener for Remove Wishlist Item//
            document.querySelectorAll(".remove-wishlist").forEach(button => {
                button.addEventListener("click", function () {
                    let index = this.dataset.index;
                    wishlist.splice(index, 1);
                    localStorage.setItem("wishlist", JSON.stringify(wishlist));
                    loadWishlist(); // Reload after removing
                });
            });
        }
    }
});
         // Admin-login page//
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let errorMsg = document.getElementById("error-msg");

    if (email === "admin@example.com" && password === "admin123") {
        window.location.href = "admin-dashboard.html";
    } else {
        errorMsg.innerText = "Invalid credentials, please try again.";
        errorMsg.style.display = "block";
        document.querySelector(".login-container").classList.add("shake");
        
        setTimeout(() => {
            document.querySelector(".login-container").classList.remove("shake");
        }, 300);
    }
});
                        //admin-dashboard page//
// Toggle Sidebar
function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

// Logout Function
function logout() {
    window.location.href = "index.html"; // Redirect to home page
}
