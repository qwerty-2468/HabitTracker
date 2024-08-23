import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const create = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedFrequency, setFrequency] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [title, setTitle] = useState("");
  const router = useRouter();
  const colors = [
    "#FF5733", // Red
    "#FFD700", // Gold
    "#5D76A9",
    "#1877F2", // Medium Purple
    "#32CD32", // Lime Green
    "#CCCCFF", // Tomato
    "#4169E1", // Royal Blue
  ];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  async function addHabit() {
    try {
      const habitDetails = {
        title: title,
        frequency: selectedFrequency,
        label: selectedColor,
        days: selectedDays,
      };

      const response = await fetch(process.env.EXPO_PUBLIC_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habitDetails),
      });

      if (response.status === 200) {
        setTitle("");
        router.back();
      }

      console.log("habit added", response);
    } catch (error) {
      console.log("error adding a habit", error);
    }
  }
  return (
    <View style={{ padding: 10, paddingTop: 50 }}>
      <Ionicons
        name="arrow-back"
        size={24}
        color="black"
        onPress={() => router.back()}
      />

      <Text style={{ fontSize: 20, marginTop: 10 }}>
        Create <Text style={{ fontSize: 20, fontWeight: "500" }}>Habit</Text>
      </Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{
          width: "95%",
          marginTop: 15,
          padding: 15,
          borderRadius: 10,
          backgroundColor: "#E1EBEE",
        }}
        placeholder="Title"
      />

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Color</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          {colors?.map((item, index) => (
            <TouchableOpacity
              onPress={() => setSelectedColor(item)}
              key={index}
              activeOpacity={0.8}
            >
              {selectedColor === item ? (
                <FontAwesome name="square" size={30} color={item} />
              ) : (
                <FontAwesome name="square-o" size={30} color={item} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "500" }}>Frequency</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setFrequency("daily")}
          style={{
            backgroundColor:
              selectedFrequency === "daily" ? "#AFDBF5" : "white",
            padding: 10,
            borderRadius: 6,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFrequency("weekly")}
          style={{
            backgroundColor:
              selectedFrequency === "weekly" ? "#AFDBF5" : "white",
            padding: 10,
            borderRadius: 6,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Weekly</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "500" }}>On these days</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 10,
        }}
      >
        {days?.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (selectedDays.includes(index)) {
                setSelectedDays(selectedDays.filter((day) => day !== index));
              } else {
                setSelectedDays([...selectedDays, index]);
              }
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 5,
              backgroundColor: selectedDays.includes(index)
                ? "#AFDBF5"
                : "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={addHabit}
        style={{
          marginTop: 25,
          backgroundColor: "#00428c",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
        >
          SAVE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default create;

const styles = StyleSheet.create({});
