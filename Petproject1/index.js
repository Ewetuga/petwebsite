const buttonEl = Array.from(document.querySelectorAll(".filter-buttons button"));
console.log(buttonEl);

buttonEl.forEach(button => {
    button.addEventListener("click", () => {
        buttonEl.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filterCategoryEl = button.textContent.toLowerCase();
        const ulItemsEl = document.querySelectorAll(".products ul");

        ulItemsEl.forEach(ul => {
            const dataName = ul.getAttribute("data-name").toLowerCase();

            if (filterCategoryEl === "all" || dataName === filterCategoryEl) {
                ul.style.display = "block";
            } else {
                ul.style.display = "none";
            }
        });
    });
});


const cartEl = document.getElementById("cart");
const showCart = document.getElementById("cart-display");
cartEl.addEventListener("click",()=>{

showCart.classList.toggle("carts");

console.log("hello world");

});

// to show cart options
const cartDisplay = document.getElementById("cart-display");
const cartMenus = document.querySelector("#cart");

cartMenus.addEventListener("click", (e) => {
    e.preventDefault();
    cartDisplay.classList.toggle("show-cart");
    console.log("Cart toggled");

    //scroll to cart
    cartDisplay.scrollIntoView({behavior:"smooth"});
});

// nav selection
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});

// to display menu at small screen

const hamEl = document.getElementById("hams");
const menuDisplay = document.getElementById("menu-display");
const menuLinks = document.querySelectorAll(".menu-links a");
hamEl.addEventListener("click",()=>{

    
    menuDisplay.classList.toggle("show");
    console.log("hello");
    
});

menuLinks.forEach(link=>{
    link.addEventListener("click",()=>{
        menuDisplay.classList.remove("show");
    });
});

//update cart
// Function to update the total price
function updateTotalPrice() {
    let totalPrice = 0;
    const cartItems = document.querySelectorAll("#purchased .cart-item");

    cartItems.forEach(item => {
        const priceElement = item.querySelector("p:nth-child(2)"); // Select the second <p> element
        const quantityElement = item.querySelector("p:nth-child(3)"); // Select the third <p> element

        const price = parseFloat(priceElement.textContent.replace("Price: NGN ", "").replace(/,/g, ""));
        const quantity = parseInt(quantityElement.textContent.replace("Quantity: ", ""));

        totalPrice += price * quantity;
    });

    const totalElement = document.getElementById("cart-total");
    totalElement.textContent = `Total: NGN ${totalPrice.toLocaleString()}`;
}

// Function to handle quantity change
function handleQuantityChange(button, isIncrease) {
    const quantitySpan = button.parentElement.querySelector("span");
    console.log(quantitySpan ,"quantity span");
    
    let currentValue = parseInt(quantitySpan.textContent);
    console.log(currentValue , "current value");
    

    if (isIncrease) {
        console.log("yes it is");
        currentValue += 1;
        quantitySpan.textContent = currentValue; 
        console.log(quantitySpan.textContent);
        
    } else {
        if (currentValue > 1) {
            currentValue -= 1;
            quantitySpan.textContent = currentValue;
        }
        else {
            // Remove the item if quantity is 1 and decrease button is clicked
            button.closest(".cart-item").remove();
            console.log('removed');
            
        }
    }

    // Update the total price whenever the quantity changes
    updateTotalPrice();
};

// Function to handle item removal
function handleItemRemoval(button) {
    button.closest(".cart-item").remove();
    updateTotalPrice();
};


//adding to cart
const ulElements = document.querySelectorAll("ul[data-name]");
ulElements.forEach((ul)=>{
    const cartDiv = document.createElement("div");
    cartDiv.className="cart";
    
    const addToCartButton= document.createElement("button");
    addToCartButton.className="addtocart";
    addToCartButton.innerHTML="Add to &#128722;"

    cartDiv.appendChild(addToCartButton);
    ul.appendChild(cartDiv);

    addToCartButton.addEventListener("click", () => {
        const productName = ul.querySelector("h3").textContent;
        const productPrice = ul.querySelector(".price span").textContent;
        const productQuantity = ul.querySelector(".quantity span").textContent;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <h4>${productName}</h4>
            <p>Price: NGN ${productPrice}</p>
            <p>Quantity: ${productQuantity}</p>
                     <button class="increase">+</button>
            <button class="decrease">-</button>
            <button class="remove">Remove</button>
        `;

        document.getElementById("purchased").appendChild(cartItem);
        console.log(`${productName} added to cart`);
        console.log(`${productPrice}`);

  // Attach event listeners to the new buttons
  cartItem.querySelector(".increase").addEventListener("click", () => handleQuantityChange(cartItem.querySelector(".increase"), true));
  cartItem.querySelector(".decrease").addEventListener("click", () => handleQuantityChange(cartItem.querySelector(".decrease"), false));
  cartItem.querySelector(".remove").addEventListener("click", () => handleItemRemoval(cartItem.querySelector(".remove")));



        updateTotalPrice();
    });
});

// Attach event listeners to increase and decrease buttons
document.querySelectorAll(".increase").forEach(button => {
    button.addEventListener("click", () => handleQuantityChange(button, true));
});

document.querySelectorAll(".decrease").forEach(button => {
    button.addEventListener("click", () => handleQuantityChange(button, false));
});

// Attach event listeners to remove buttons
document.querySelectorAll(".remove").forEach(button => {
    button.addEventListener("click", () => handleItemRemoval(button));
});

//updating total


