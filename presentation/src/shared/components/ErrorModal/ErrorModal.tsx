import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./ErrorModalStyles";

interface ErrorModalProps {
  message: string;
  errorModalVisible: boolean;
  setErrorModalVisible: (condition: boolean) => void;
}

export default function ErrorModal({
  message,
  errorModalVisible,
  setErrorModalVisible,
}: ErrorModalProps) {
  return (
    <Modal visible={errorModalVisible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.header}>Ooops</Text>
          <Text style={styles.message}>{message}</Text>
          <Pressable
            style={styles.absoluteButton}
            onPress={() => setErrorModalVisible(!errorModalVisible)}
          >
            <Text style={styles.closeButton}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
