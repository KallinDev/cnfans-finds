import json

with open('products_with_images.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

seen_links = set()
unique_products = []
for product in products:
    link = product.get('link')
    if link and link not in seen_links:
        unique_products.append(product)
        seen_links.add(link)

with open('products_with_images.json', 'w', encoding='utf-8') as f:
    json.dump(unique_products, f, indent=2, ensure_ascii=False)