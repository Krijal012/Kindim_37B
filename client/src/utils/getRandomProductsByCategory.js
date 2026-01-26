function getRandomProductsByCategory(products) {
    const categories = {};

    // Group products by category
    products.forEach((product) => {
        if (!categories[product.category]) {
            categories[product.category] = [];
        }
        categories[product.category].push(product);
    });

    // Pick one random product from each category
    return Object.values(categories).map((items) => {
        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    });
}
export default getRandomProductsByCategory;