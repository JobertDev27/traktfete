import { FlatList, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const spendings = [
  {
    id: 1,
    spendOn: "water",
    price: 15,
  },
  {
    id: 2,
    spendOn: "fishball",
    price: 25,
  },
  {
    id: 3,
    spendOn: "siomai rice",
    price: 35,
  },
  {
    id: 4,
    spendOn: "beef tafa",
    price: 50,
  },
  {
    id: 5,
    spendOn: "gas",
    price: 100,
  },
];

interface itemType {
  spendOn: String;
  price: number;
}

const ItemBox = ({ spendOn, price }: itemType) => {
  return (
    <View>
      <Text>{spendOn}</Text>
      <Text>{price}</Text>
    </View>
  );
};

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          data={spendings}
          renderItem={({ item }) => <ItemBox {...item} />}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
