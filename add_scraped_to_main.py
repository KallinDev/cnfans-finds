#!/usr/bin/env python3
import json

scraped_path = "products_with_images_scraped.json"
main_path = "public/products_with_images.json"

# Load scraped products
with open(scraped_path, "r", encoding="utf-8") as f:
    scraped_products = json.load(f)

# Load main products
with open(main_path, "r", encoding="utf-8") as f:
    main_products = json.load(f)

# Transform scraped products to match main file structure
def transform_product(prod):
    new_prod = {}
    # Map keys
    if "title" in prod:
        new_prod[""] = prod["title"]
    if "price" in prod:
        new_prod["__1"] = prod["price"]
    if "link" in prod:
        new_prod["__2"] = prod["link"]
    # Copy other fields
    for k in prod:
        if k not in ["title", "price", "link"]:
            new_prod[k] = prod[k]
    return new_prod

transformed = [transform_product(p) for p in scraped_products]

# Append to main products
main_products.extend(transformed)

# Save back to main file
with open(main_path, "w", encoding="utf-8") as f:
    json.dump(main_products, f, ensure_ascii=False, indent=2)

print(f"Added {len(transformed)} products to {main_path}")
