import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Spending = {
  itemId: string;
  itemName: string;
  itemPrice: number;
};

export default function Index() {
  const [spent, setSpent] = useState<number>(0);
  const [spendingList, setSpendingList] = useState<Spending[]>([]);

  const [itemName, setItemName] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<string>("");

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("spend-history");
      return data != null ? JSON.parse(data) : null;
    } catch (err) {
      return err;
    }
  };

  const addItem = () => {
    if (itemName == "" || itemPrice == "") return;

    const newItem = {
      itemId: Crypto.randomUUID(),
      itemName: itemName,
      itemPrice: Number(itemPrice),
    };

    setSpendingList((spendingList) => {
      const list = spendingList ?? [];
      const updatedList = [...list, newItem];

      AsyncStorage.setItem("spend-history", JSON.stringify(updatedList));
      setItemName("");
      setItemPrice("");
      return updatedList;
    });
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      setSpendingList(data);
      console.log(`This is the spending list: ${JSON.stringify(data)}`);

      if (!Array.isArray(data)) return;

      const totalSpent = data.reduce((total: number, item: Spending) => {
        return (total += item.itemPrice);
      }, 0);

      setSpent(totalSpent);
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
            ₱{500 - spent}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#e0e0e0",
            }}
          >
            Total Spent: {spent}
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
            value={itemName}
            onChangeText={(text) => setItemName(text)}
          />
          <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Item Price</Text>
          <TextInput
            placeholder="Enter Item Price"
            style={{ backgroundColor: "#FFFFFF" }}
            value={itemPrice}
            onChangeText={(text) => setItemPrice(text)}
          />
          <Pressable
            onPress={() => {
              addItem();
            }}
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
              <Text style={{ color: "#FFFFFF" }}>
                {item.itemName} = {item.itemPrice}
              </Text>
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
