import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { signIn } from "../../alogic/auth";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      setMessage("Please provide both email and password.");
      return;
    }

    const result = await signIn(email, password);
    if (result.success) {
      setMessage("User logged in successfully!");

      // navigate to homescreen after successful login
      navigation.replace("Home");
      
    } else {
      setMessage(`Error: ${result.error}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="password"
      />
      <Button title="Log In" onPress={handleSignIn} />
      {message ? (
        <Text style={[styles.message, { color: message.startsWith("Error") ? "red" : "green" }]}>
          {message}
        </Text>
      ) : null}

      {/* Navigation link to SignUp */}
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    color: "blue",
    textAlign: "center",
  },
});

export default SignIn;
