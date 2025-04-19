import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Test from "./Test";
import Onboard from "./Onboard";

export default function App() {
  const createDbIfNeeded = async (db: SQLiteDatabase) => {
    await db.execAsync(
      `
      CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, trackers TEXT NOT NULL, date DATETIME DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS last_logged_in (id INTEGER NOT NULL, date DATETIME DEFAULT CURRENT_TIMESTAMP,  FOREIGN KEY (id) REFERENCES users(id));
      `
    );
  };

  const Stack = createNativeStackNavigator();

  return (
    <SQLiteProvider databaseName="Chronic2" onInit={createDbIfNeeded}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Onboard"
            component={Onboard}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen
            name="Home"
            component={Test}
            options={{ title: "Home" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
