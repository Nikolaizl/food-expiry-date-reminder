export const searchFoodByName = async (name) => {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
    name
  )}&search_simple=1&action=process&json=1`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.products || data.products.length === 0) return [];

  return data.products
    .filter((p) => p.product_name)
    .slice(0, 5)
    .map((p) => ({
      name: p.product_name,
      image_url: p.image_url || "",
    }));
};
