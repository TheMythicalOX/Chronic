import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import Test from "./Test";
import Onboard from "./Onboard";

export default function App() {
  const [useId, setId] = useState<number | null>(null);
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
    <SQLiteProvider databaseName="Chronic3" onInit={createDbIfNeeded}>
      <NavigationContainer>
        <Context.Provider value={{ useId: useId, setId: setId }}>
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
        </Context.Provider>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
type UserData = {
  useId: number | null;
  setId: Dispatch<SetStateAction<number | null>> | null;
};
export const useMyContext = () => useContext(Context);
const Context = createContext<UserData>({ useId: null, setId: null });
