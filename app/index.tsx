import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Spending = {
  itemId: string;
  itemName: string;
  itemPrice: number;
};

export default function Index() {
  const [spendingList, setSpendingList] = useState<Spending[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<string>("");

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("spend-history");
      return data != null ? JSON.parse(data) : [];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const loadData = async () => {
    const data = await getData();
    setSpendingList(Array.isArray(data) ? data : []);
  };

  const addItem = () => {
    if (!itemName.trim() || !itemPrice || isNaN(Number(itemPrice))) return;

    const newItem: Spending = {
      itemId: Crypto.randomUUID(),
      itemName: itemName.trim(),
      itemPrice: Number(itemPrice),
    };

    setItemName("");
    setItemPrice("");
    setSpendingList((prev) => [...prev, newItem]);
  };

  useEffect(() => {
    const init = async () => {
      const date = new Date();
      if (date.getDay() === 1) {
        try {
          await AsyncStorage.removeItem("spend-history");
          setSpendingList([]);
          console.log("Cleared spend-history because today is Monday");
        } catch (err) {
          console.log("Failed to clear spend-history:", err);
        }
      }
      await loadData();
    };

    init();
  }, []);

  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem(
          "spend-history",
          JSON.stringify(spendingList),
        );
      } catch (err) {
        console.log(err);
      }
    };
    save();
  }, [spendingList]);

  const spent = spendingList.reduce((total, item) => total + item.itemPrice, 0);
  const limit = 500;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Spending Limit</Text>
          <Text style={styles.headerAmount}>₱{limit - spent}</Text>
          <Text style={styles.headerSpent}>Total Spent: ₱{spent}</Text>
        </View>

        <View style={styles.addItemContainer}>
          <Text style={styles.sectionTitle}>Add Item</Text>

          <Text style={styles.label}>Item Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter item name"
            value={itemName}
            onChangeText={setItemName}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Item Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter item price"
            value={itemPrice}
            onChangeText={setItemPrice}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />

          <Pressable style={styles.addButton} onPress={addItem}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>History</Text>
        <FlatList
          data={spendingList}
          keyExtractor={(item) => item.itemId}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemName}>{item.itemName}</Text>
              <Text style={styles.itemPrice}>₱{item.itemPrice}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No spendings yet</Text>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 5,
  },
  headerAmount: {
    fontSize: 48,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  headerSpent: {
    fontSize: 14,
    color: "#AAAAAA",
    marginTop: 5,
  },
  addItemContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#CCCCCC",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 100,
  },
  addButtonText: {
    color: "#121212",
    fontWeight: "600",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  itemName: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  itemPrice: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  emptyText: {
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
});
