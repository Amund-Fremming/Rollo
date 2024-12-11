import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "./shared/assets/Colors";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "./shared/assets/Dimentions";
import { useState } from "react";
import ErrorModal from "./shared/components/ErrorModal/ErrorModal";

interface StartProps {
  gameId: string;
  setGameId: React.Dispatch<React.SetStateAction<string>>;
  handleCreate: () => void;
  handleJoin: () => void;
}

export default function Start({
  gameId,
  setGameId,
  handleCreate,
  handleJoin,
}: StartProps) {
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleError = (message: string) => {
    setErrorModalVisible(true);
    setErrorMessage(message);
  };

  const handleInput = () => {
    if (gameId.length === 0) {
      handleError("Game id cannot be empty");
      return;
    }

    handleCreate();
  };

  return (
    <>
      <ErrorModal
        errorModalVisible={errorModalVisible}
        setErrorModalVisible={setErrorModalVisible}
        message={errorMessage}
      />

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={gameId}
          onChangeText={(input) => setGameId(input)}
          placeholder="Game ID"
        />
        <TouchableOpacity onPress={handleInput}>
          <Text style={styles.text}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleJoin}>
          <Text style={styles.text}>Join</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: "30%",
    width: "100%",
    height: "110%",
    backgroundColor: Colors.Dark,
  },

  input: {
    marginBottom: "8%",
    height: "10%",
    width: "80%",
    borderRadius: moderateScale(15),
    backgroundColor: Colors.Cream,
    fontFamily: "Shrikhand",
    fontSize: moderateScale(30),
    textAlign: "center",
    paddingTop: "2%",
  },

  text: {
    width: "100%",
    fontSize: moderateScale(90),
    fontFamily: "Shrikhand",
    color: Colors.Purple,
    lineHeight: verticalScale(110),
  },
});
