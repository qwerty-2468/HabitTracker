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
import { AntDesign } from "@expo/vector-icons";
import { useRouter, Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function Home() {
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [response, setResponse] = useState();
  const router = useRouter();
  const dayOfWeek = new Date().getDay() - 1;
  const today = new Date().toDateString();

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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity
            onPress={() =>
              fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/${item._id}/completed`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ date: today }),
                }
              )
                .then((res) => res.json())
                .then(
                  (result) => {
                    console.log(result);
                    fetchHabits();
                  },
                  (error) => {
                    console.log(error);
                  }
                )
            }
          >
            {item.completed.includes(today) ? (
              <FontAwesome name="check-square-o" size={30} />
            ) : (
              <FontAwesome name="square-o" size={30} />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );

  const renderItem = ({ item }) => {
    if (item.frequency === "weekly") {
      return <Item item={item} />;
    }
    return null;
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
