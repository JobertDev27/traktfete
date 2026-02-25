import { Pressable, Text, View } from "react-native";
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

export default function Index() {
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
            Spending Limit
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
        <Pressable
          onPress={() => console.log("123")}
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <Text selectable={false}>Update Balance</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
