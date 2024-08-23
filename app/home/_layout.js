import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Habits",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
          headerRight: () => (
            <AntDesign
              onPress={() => router.push("/create")}
              name="plus"
              size={30}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
          headerRight: () => (
            <AntDesign
              onPress={() => router.push("/create")}
              name="plus"
              size={30}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="this-week"
        options={{
          title: "This Week",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
          headerRight: () => (
            <AntDesign
              onPress={() => router.push("/create")}
              name="plus"
              size={30}
              color="black"
            />
          ),
        }}
      />
    </Tabs>
  );
}
