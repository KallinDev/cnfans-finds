import json

# Map keywords to your categories
category_map = {
    "Shoes": "Shoes",
    "Jacket": "Jackets",
    "Hoodie": "Hoodies/Sweaters",
    "Sweater": "Hoodies/Sweaters",
    "Sweatshirt": "Hoodies/Sweaters",
    "T-shirt": "T-shirts",
    "Tee": "T-shirts",
    "Pants": "Pants",
    "Trousers": "Pants",
    "Jeans": "Pants",
    "Shorts": "Pants",
    "Hat": "Hats",
    "Cap": "Hats",
    "Baseball": "Hats",
    "Accessories": "Accessories",
    "Sunglasses": "Accessories",
    "Necklace": "Accessories",
    "Mask": "Accessories",
    "Perfume": "Accessories",
    "Chain": "Accessories",
}

def get_category(title):
    for keyword, category in category_map.items():
        if keyword.lower() in title.lower():
            return category
    return "Other"

with open('products_with_images_scraped.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

for product in products:
    product['category'] = get_category(product['title'])

with open('products_with_images_scraped.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)