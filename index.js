/*Instructions:
1)Fetch all the menu items from http://localhost:3000/menu.
    For each menu item:
        create a span element
        contains the name of the menu item
        add it to the #menu-items div.
2) When the page loads, display the first menu item.
    You should set the image, name, description, and price.
    All the correct elements to set are located in the #dish section element.
3) When the user clicks on the menu items on the left, 
    they should see all the details for that specific menu item.
4) The user should be able to add the menu items to their cart. 
    When the user presses the 'Add to Cart' button,
    that number should be added to however many are currently in the cart.

*/
// Write your code here...

//Global variables
const baseURL = 'http://localhost:3000/menu'
let selectedItem; 

//DOM selectors
const menuItems = document.querySelector('#menu-items');
const dishImg = document.querySelector('#dish-image');
const dishName = document.querySelector('#dish-name');
const dishDes = document.querySelector('#dish-description');
const dishPrice = document.querySelector('#dish-price');
const cartForm = document.querySelector('#cart-form');
const numInCart = document.querySelector('#number-in-cart');
const dishDiv = document.querySelector('#dish');
const cartDisplay = document.querySelector('#cart-display');
const priceDisplay = document.createElement('h3');
priceDisplay.textContent = "Current total: $"
dishDiv.appendChild(priceDisplay);
const price = document.createElement('span')
price.textContent = 0;
priceDisplay.appendChild(price);


//Fetch Functions
function getMenu(url){
    fetch(url)
    .then(resp => resp.json())
    .then(dishArr => {
        dishArr.forEach(dishObj => renderMenu(dishObj));
        renderDetails(dishArr[0])
    })
}

//Render Functions
function renderMenu(item){
    // menuArr.forEach(item => {
        const itemSpan = document.createElement('span');
        itemSpan.textContent = item.name;
        menuItems.appendChild(itemSpan)
        itemSpan.addEventListener('click',() => renderDetails(item))
    // })
}

function renderDetails(menuItem){
    selectedItem = menuItem;
    dishImg.src = menuItem.image;
    dishName.textContent = menuItem.name;
    dishDes.textContent = menuItem.description;
    dishPrice.textContent = `$${menuItem.price}`;
    numInCart.textContent = menuItem.number_in_bag;
    //numInCart.textContent = parseInt(numInCart.textContent) + parseInt(menuItem["number-bag"])
    //price.textContent = parseFloat(menuItem["ordered-price"])
}

//Even Listeners & Handlers
cartForm.addEventListener('submit', (e) => cartSubmit(e))

function cartSubmit(e){
    e.preventDefault();
    let numToAdd = Number(e.target['cart-amount'].value);
    const currentNum = parseInt(numInCart.textContent)
    const newNum = currentNum + numToAdd;
    numInCart.textContent = newNum;

    const itemPrice = parseFloat(selectedItem.price);
    const priceForItems = numToAdd * itemPrice;
    const currentPrice = parseFloat(price.textContent);
    const priceInCart = priceForItems + currentPrice;
    price.textContent = priceInCart;

    
    
    selectedItem["number_in_bag"] += numToAdd;
    selectedItem["ordered_price"] = priceForItems;
    //console.log(selectedItem);

    
    // fetch(`${baseURL}/${selectedItem.id}`, {
    //     method: 'PATCH',
    //     headers: {'Content-type': 'application/json'},
    //     body: JSON.stringify(selectedItem)
    // })
    //     .then(resp => resp.json())
    //     .then(data => console.log(data))

    cartForm.reset();
}

//initializers
getMenu(baseURL)