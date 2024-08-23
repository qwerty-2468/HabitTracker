import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter, Link } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function Home() {
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [response, setResponse] = useState();
  const router = useRouter();
  const today = new Date().toDateString();
  dayOfWeek = new Date().getDay() - 1;

  const days = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [])
  );

  const fetchHabits = async () => {
    fetch(process.env.EXPO_PUBLIC_API_URL)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setResponse(result);
        },
        (error) => {
          setIsLoading(false);
          setError(typeof error === "string" ? error : null);
        }
      );
  };

  const getProgress = (item) => {
    if (item.frequency === "daily") {
      return (
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          {days.map((day, index) => {
            if (item.days.includes(index)) {
              const diff = new Date().getDay() - 1 - index;
              const date = new Date();
              date.setDate(date.getDate() - diff);
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 5,
                    backgroundColor:
                      diff >= 0 && item.completed.includes(date.toDateString())
                        ? "#00FF00"
                        : diff <= 0
                        ? "#E0E0E0"
                        : "#FF0000",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>{day}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      );
    }
  };

  const Item = ({ item }) => (
    <Link
      href={{
        pathname: "/[id]",
        params: { id: item._id },
      }}
      style={[styles.item, { backgroundColor: item.label }]}
      asChild
    >
      <TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.frequency}</Text>
        {getProgress(item)}
      </TouchableOpacity>
    </Link>
  );

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (error) {
      return <Text>{error}</Text>;
    }
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={response}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </SafeAreaView>
    );
  };

  return <View style={styles.container}>{getContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar?.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  text: {
    fontSize: 16,
  },
});
