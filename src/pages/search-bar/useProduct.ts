import axios from "axios";
import { ref, watchEffect } from "vue";

const tabs = ["All", "Result"];

type Product = {
  id: number;
  product_name: string;
  product_name_ascii: string;
  category_id: number;
  brand_id: number;
  image_url: string;
};

const request = axios.create({ baseURL: "https://nest-mobile.vercel.app/api" });

export default function useProduct() {
  const products = ref<Product[]>([]);

  const value = ref("");
  const isFetching = ref(true);
  const tab = ref("All");

  type Search = {
    variant: "search";
  };

  type GetProducts = {
    variant: "get-products";
  };

  const fetchProduct = async (props: Search | GetProducts) => {
    try {
      isFetching.value = true;

      switch (props.variant) {
        case "search": {
          const res = await request.get<Product[]>(
            `/products/search?q=${value.value}`,
          );

          products.value = res.data;
          tab.value = "Result";
          break;
        }
        case "get-products": {
          const res = await request.get<{ products: Product[] }>(`/products`);
          products.value = res.data.products;

          break;
        }
      }
    } catch (err) {
      console.log({ message: err });
    } finally {
      isFetching.value = false;
    }
  };

  watchEffect(() => {
    if (tab.value !== "All") return;

    fetchProduct({ variant: "get-products" });
  });

  return {
    isFetching,
    value,
    fetchProduct,
    tabs,
    products,
    tab,
  };
}
