import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { defaultPictureImage } from "@/components/ProductListItem";
import products from "@/assets/data/products";
import Button from "@/components/button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [activeSize, setActiveSize] = useState<PizzaSize>("M");
  const { addItem } = useCart();
  const router = useRouter();

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if (!product) return;

    addItem(product, activeSize);
    router.push("/cart");
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        style={styles.image}
        source={{ uri: product.image ?? defaultPictureImage }}
      />
      <Text>Select sizes</Text>
      <View style={styles.sizes}>
        {sizes.map((s) => (
          <Pressable
            style={[
              styles.size,
              {
                backgroundColor: activeSize === s ? "gainsboro" : "white",
              },
            ]}
            key={s}
            onPress={() => {
              setActiveSize(s);
            }}
          >
            <Text
              style={[
                styles.sizeText,
                { color: activeSize === s ? "black" : "gray" },
              ]}
            >
              {s}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button text="Add to cart" onPress={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: "auto",
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
export default ProductDetailsScreen;
