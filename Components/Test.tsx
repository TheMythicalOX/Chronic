import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
const Test = () => {
  const [useTest, setTest] = useState("");
  const [useData, setData] = useState<UserType[]>([]);
  type UserType = { id: number; name: string; date: string };

  const database = useSQLiteContext();

  const handlePress = () => {
    try {
      database.runAsync("INSERT INTO test (name) VALUES (?);", [useTest]);
      loadData();
      setTest("");
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = async () => {
    const result = await database.getAllAsync<UserType>("SELECT * FROM test");
    setData(result);
  };

  useEffect(() => {
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
      <Button title="Press Me" onPress={handlePress} color="#841584" />
      <FlatList
        data={useData}
        renderItem={({ item }) => (
          <View>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Test;
