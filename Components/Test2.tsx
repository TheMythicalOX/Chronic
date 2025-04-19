import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, View } from "react-native";

type TestscreenProps = NativeStackScreenProps<ParamListBase, "Test">;

const Test: React.FC<TestscreenProps> = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Home"
        onPress={() => {
          navigation.replace("Home");
        }}
        color="#841584"
      />
    </View>
  );
};

export default Test;
