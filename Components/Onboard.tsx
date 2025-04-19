import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Checkbox from "expo-checkbox";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Button, TextInput, View, Text } from "react-native";

type TestscreenProps = NativeStackScreenProps<ParamListBase, "Onboard">;

const Onboard: React.FC<TestscreenProps> = ({ navigation }) => {
  const [useName, setName] = useState("");
  const [isFatique, setIsFatique] = useState(false);
  const database = useSQLiteContext();

  type UserType = {
    id: number;
    username: string;
    trackers: string;
    date: string;
  };
  const createUser = async () => {
    let tmp = JSON.stringify([isFatique]);
    try {
      await database.runAsync(
        "INSERT INTO users (username, trackers) VALUES (?, ?);",
        useName,
        tmp
      );
    } catch (error) {
      console.log(error);
    }
  };

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
