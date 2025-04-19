import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Test from "./Test";

export default function App() {
  const createDbIfNeeded = async (db: SQLiteDatabase) => {
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date DATETIME DEFAULT CURRENT_TIMESTAMP);"
    );
  };

  return (
    <SQLiteProvider databaseName="test" onInit={createDbIfNeeded}>
      <View style={styles.container}>
        <Text>
          Open up App.tsx to start working on your appdfhdwdawddawd jdhgadawd
          asdawd!
        </Text>
        <Test />
        <StatusBar style="auto" />
      </View>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
