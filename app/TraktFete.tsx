import { useState } from "react";
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
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 5,
        padding: 5,
        backgroundColor: "#6C7C87",
      }}
    >
      <Text
        style={{
          color: "#F1F2F3",
          fontSize: 18,
        }}
      >
        {spendOn}
      </Text>
      <Text
        style={{
          color: "#F1F2F3",
          fontSize: 18,
        }}
      >
        {price}
      </Text>
    </View>
  );
};

export default function TraktFete() {
  const [limit, setLimit] = useState<number>(0);
  const [totalSpent, setTotalSpent] = useState<number>(0);

  const spent = spendings.reduce((total, item) => {
    return total + item.price;
  }, 0);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>WEEKLY LIMIT: {limit}</Text>
          <Text>CASH: 245</Text>
          <Text>TOTAL SPENDING: {spent}</Text>
        </View>
        <FlatList
          data={spendings}
          renderItem={({ item }) => <ItemBox {...item} />}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
