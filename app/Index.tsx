import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
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

type Spending = {
  itemId: string;
  itemName: string;
  itemPrice: number;
};

export default function Index() {
  const [spent, setSpent] = useState<number>(0);
  const [spendingList, setSpendingList] = useState<Spending[]>([]);

  const getData = async () => {
    const data = await AsyncStorage.getItem("spend-history");
    return data != null ? JSON.parse(data) : null;
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      setSpendingList(data);
    };

    loadData();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ backgroundColor: "#1d1d1d", padding: 25, flex: 1 }}
      >
        <View
          style={{
            backgroundColor: "#515151",
            padding: 20,
            boxSizing: "border-box",
            borderRadius: 25,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#FFFFFF",
            }}
          >
            Spending Limit: 500
          </Text>
          <Text
            style={{
              fontSize: 48,
              color: "#FFFFFF",
              fontWeight: "600",
            }}
          >
            ₱500
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#e0e0e0",
            }}
          >
            Total Spent: ₱240
          </Text>
        </View>
        <View
          style={{
            marginTop: 50,
            marginBottom: 50,
            gap: 15,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "600" }}>
            Add Item:
          </Text>
          <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Item Name</Text>
          <TextInput
            placeholder="Enter Item Name"
            style={{ backgroundColor: "#FFFFFF" }}
          />
          <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Item Price</Text>
          <TextInput
            placeholder="Enter Item Price"
            style={{ backgroundColor: "#FFFFFF" }}
          />
          <Pressable
            onPress={() => console.log("123")}
            style={{
              backgroundColor: "#FFFFFF",
              alignSelf: "flex-start",
              padding: 5,
            }}
          >
            <Text selectable={false}>Add</Text>
          </Pressable>
        </View>
        <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "600" }}>
          History:
        </Text>
        {spendingList && (
          <FlatList
            data={spendingList}
            renderItem={({ item }: { item: Spending }) => (
              <Text>
                {item.itemName} = {item.itemPrice}
              </Text>
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
