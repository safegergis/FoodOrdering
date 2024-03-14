import { StyleSheet, Text, View, Image } from "react-native";

import Colors from "@/constants/Colors";
import { Product } from "@/types";
type ProductListItemProps = {
  product: Product;
};

const defaultImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png";
const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image ?? defaultImage }}
        style={styles.image}
      ></Image>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductListItem;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  price: {
    color: Colors.light.tint,
  },
  image: { width: "100%", aspectRatio: 1 },
});
