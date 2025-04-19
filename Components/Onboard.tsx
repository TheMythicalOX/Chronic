import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Checkbox from "expo-checkbox";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, TextInput, View, Text } from "react-native";
import { useMyContext } from "./App";

type TestscreenProps = NativeStackScreenProps<ParamListBase, "Onboard">;

const Onboard: React.FC<TestscreenProps> = ({ navigation }) => {
  const [useName, setName] = useState("");
  const [isFatique, setIsFatique] = useState(false);
  const database = useSQLiteContext();

  const { useId, setId } = useMyContext();
  const createUser = async () => {
    let tmp = JSON.stringify([isFatique]);
    try {
      await database.runAsync(
        "INSERT INTO users (username, trackers) VALUES (?, ?);",
        useName,
        tmp
      );
      await database.runAsync(
        "INSERT INTO last_logged_in (id) VALUES ((SELECT id FROM users WHERE username = ?));",
        useName
      );
    } catch (error) {
      console.log("ERROR");
      console.log(error);
    }
  };

  const getLogged = async () => {
    try {
      const result = await database.getFirstAsync<{ data: number }>(
        "SELECT id FROM last_logged_in ORDER BY date DESC LIMIT 1;"
      );
      console.log(result);
      if (typeof result?.data === "number" && setId) {
        setId(result.data);
        navigation.replace("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLogged();
  }, []);

  return (
    <View>
      <TextInput
        placeholder="Enter Name"
        value={useName}
        onChangeText={(e) => {
          setName(e);
        }}
      />
      <View>
        <Text>Track Chronic Fatique?</Text>
        <Checkbox value={isFatique} onValueChange={setIsFatique} />
      </View>
      <Button
        title="Next"
        onPress={() => {
          createUser();
          navigation.replace("Home");
        }}
      ></Button>
    </View>
  );
};

export default Onboard;
