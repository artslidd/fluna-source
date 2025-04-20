import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import { useState } from "react";

const clientId = "sandbox_id_2b27d6d447d44858baeb00e24c292f97";
const clientSecret =
  "sandbox_secret_YdVFAsr12Mfqs3zJrkNWzSKXdgIxpozJB8Ti4UpWz1vRrKpsP9BCBROBFXE8XUQr";

export default function Index() {
  const [text, setText] = useState("");
  const privateKey = "0x1234...5678"; // Example private key

  const copyToClipboard = async () => {
    await Clipboard.setString(privateKey);
    // You might want to add a toast notification here
  };

  return (
    <View style={styles.container}>
      <View style={styles.keyContainer}>
        <Text style={styles.keyLabel}>Private Key:</Text>
        <Text style={styles.keyText}>{privateKey}</Text>
        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
          <Text style={styles.copyButtonText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Enter text here..."
        placeholderTextColor="#666"
        multiline
        textAlign="center"
      />
      <Text style={styles.preview}>Preview: {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  keyContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  keyLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
  keyText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    fontFamily: "monospace",
  },
  copyButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  copyButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  preview: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});
