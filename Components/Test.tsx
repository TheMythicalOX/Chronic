import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  processColor,
  Text,
  TextInput,
  View,
} from "react-native";
import { useMyContext } from "./App";

type HomeScreenProps = NativeStackScreenProps<ParamListBase, "Home">;

const Test: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [useTest, setTest] = useState("");
  const [useData, setData] = useState<UserType[]>([]);
  type UserType = {
    id: number;
    username: string;
    trackers: string;
    date: string;
  };

  const database = useSQLiteContext();

  const { useId, setId } = useMyContext();

  const loadData = async () => {
    const result = await database.getAllAsync<UserType>(
      "SELECT * FROM last_logged_in"
    );
    // console.log(result);
    setData(result);
  };

  const loadUser = async () => {
    try {
      const result = await database.getFirstAsync<{ name: string }>(
        "SELECT username FROM users WHERE id = ?;",
        useId
      );
      console.log(result);
      if (typeof result?.name === "string") {
        navigation.setOptions({ title: "Hello " + result.name });
      }
    } catch (error) {
      console.log(error);
      navigation.replace("Onboard");
    }
  };

  useEffect(() => {
    loadUser();
    loadData();
  }, []);

  return (
    <View>
      <TextInput
        onChangeText={(e) => {
          setTest(e);
        }}
        value={useTest}
        placeholder="Enter text here"
      />
      <Button
        title="Onboard"
        onPress={() => {
          navigation.replace("Onboard");
        }}
        color="#841584"
      />
      <Text>{}</Text>
      <FlatList
        data={useData}
        renderItem={({ item }) => (
          <View>
            <Text>{item.id}</Text>
            <Text>{item.username}</Text>
            <Text>{item.trackers}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Test;
