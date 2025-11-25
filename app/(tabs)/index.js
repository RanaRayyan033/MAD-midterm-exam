import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const API_URL = "http://127.0.0.1:3000/api"; 

export default function App() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [randomItem, setRandomItem] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  // Fetch all menu items
  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/menu`);
      const data = await res.json();
      setMenu(data);
      setShowMenu(true);
      setRandomItem(null);
    } catch (err) {
      console.log("Error fetching menu:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch one random item
  const fetchRandom = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/menu/random`);
      const data = await res.json();
      setRandomItem(data);
      setShowMenu(false);
    } catch (err) {
      console.log("Error fetching random item:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetails}>
        {item.category} • Rs.{item.price}
      </Text>
      <Text
        style={[
          styles.stock,
          { color: item.inStock ? "#2e7d32" : "#c62828" },
        ]}
      >
        {item.inStock ? "Available" : "Out of Stock"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coffee Shop Menu</Text>

      {/* Buttons Section */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={fetchMenu}>
          <Text style={styles.buttonText}>Coffee Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={fetchRandom}>
          <Text style={styles.buttonText}>Pick Random Item</Text>
        </TouchableOpacity>
      </View>

      {/* Loader */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6a1b9a" />
          <Text style={styles.loadingText}>Please wait...</Text>
        </View>
      )}

      {/* Full Menu */}
      {!loading && showMenu && (
        <FlatList
          data={menu}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      {/* Random Item */}
      {!loading && randomItem && (
        <View style={styles.randomContainer}>
          <Text style={styles.randomTitle}>Your Lucky Pick</Text>
          <Text style={styles.randomItem}>
            {randomItem.name} ({randomItem.category}) - Rs.{randomItem.price}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf5ff", 
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4a148c",
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6a1b9a",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#311b92",
  },
  itemDetails: {
    fontSize: 14,
    color: "#616161",
    marginTop: 4,
  },
  stock: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: "500",
  },
  randomContainer: {
    marginTop: 30,
    backgroundColor: "#ede7f6",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  randomTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a148c",
    marginBottom: 10,
  },
  randomItem: {
    fontSize: 16,
    color: "#311b92",
    textAlign: "center",
  },
  loadingContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 15,
    color: "#6a1b9a",
  },
});
