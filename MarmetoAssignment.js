function fetchData() {
    const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw new Error('Unable to fetch data');
        });
}

function calculateDiscountPercentage(price, comparePrice) {
    const discount = ((comparePrice - price) / comparePrice) * 100;
    return Math.round(discount);
}

function createProductCard(product) {

    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.textContent = product.badge_text;

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;

    const nameVendor = document.createElement('div');
    nameVendor.className = "name-vendor";

    const title = document.createElement('h2');
    title.textContent = product.title;
    title.className = "title";

    const vendor = document.createElement('p');
    vendor.textContent = `${product.vendor}`;

    const priceContainer = document.createElement('div');
    priceContainer.className = 'name-vendor';

    const price = document.createElement('p');
    price.textContent = `Rs.${product.price}`;

    const comparePrice = document.createElement('p');
    comparePrice.textContent = `${product.compare_at_price}`;
    comparePrice.className = 'compare-price';

    const discount = document.createElement('p');
    const discountPercentage = calculateDiscountPercentage(product.price, product.compare_at_price);
    discount.textContent = `${discountPercentage}% Off`;
    discount.className = 'discount';

    const addToCartButton = document.createElement('button');
    addToCartButton.className = 'button';
    addToCartButton.textContent = 'Add to Cart';

    productCard.appendChild(badge);
    productCard.appendChild(productImage);
    nameVendor.appendChild(title);
    nameVendor.appendChild(vendor);
    productCard.appendChild(nameVendor);
    priceContainer.appendChild(price);
    priceContainer.appendChild(comparePrice);
    priceContainer.appendChild(discount);
    productCard.appendChild(priceContainer);
    productCard.appendChild(addToCartButton);
    return productCard;
}


function showProducts(category) {
    fetchData()
        .then(data => {
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = '';

            const categoryData = data.categories.find(cat => cat.category_name === category);
            const tab = document.getElementById('tabs');
            const men = document.getElementById('men');
            const women = document.getElementById('women');
            const kids = document.getElementById('kids');
            if (category === "Men") {
                men.className = 'select-button';
                tab.appendChild(men);
            } else {
                men.className = "tabs-button";
                tab.appendChild(men);
            }
            if (category === "Women") {
                women.className = 'select-button';
                tab.appendChild(women);
            } else {
                women.className = "tabs-button";
                tab.appendChild(women);
            }

            if (category === "Kids") {
                kids.className = 'select-button';
                tab.appendChild(kids);
            } else {
                kids.className = "tabs-button";
                tab.appendChild(kids);
            }
            if (categoryData) {
                categoryData.category_products.forEach(product => {
                    const productCard = createProductCard(product);
                    productContainer.appendChild(productCard);
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}