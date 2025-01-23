import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { signUp } from "../../alogic/auth";
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    if (!email || !password) {
      setMessage("Please provide both email and password.");
      return;
    }

    try {
      const result = await signUp(email, password);
      if (result.success) {
        setMessage("User signed up successfully!");
        navigation.replace("SignIn");
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setMessage(`Unexpected error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.title}>Breakit</Text>
        <Image source={require('../../assets/images/samplesplash.png')} style={styles.icon} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A9A9A9"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="password"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
      {message && (
        <Text style={[styles.message, { color: message.startsWith("Error") ? "red" : "#32CD32" }]}>
          {message}
        </Text>
      )}

      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.notLink}>Already have an account? <Text style={styles.link}>Sign In</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff", 
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  icon: {
    width: 150,
    height: 150,
    borderRadius: 25, 
  },
  input: {
    color: "#000", 
    height: 45,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10, 
    marginBottom: 15,
    paddingHorizontal: 12,
    width: "100%",
    backgroundColor: "#fff", 
  },
  button: {
    backgroundColor: "#000", 
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30, 
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  message: {
    marginTop: 10,
    fontSize: 16,
  },
  notLink: {
    marginTop: 15,
    color: "#000",
    textAlign: "center",
  },
  link: {
    color: "#FF3B30", 
    fontWeight: "bold",
  },
});

export default SignUp;
