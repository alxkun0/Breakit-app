import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
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

    // handles the verification and redirects user when successful
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
      <Button title="Sign Up" onPress={handleSignUp} />
      {message ? (
        <Text
          style={[
            styles.message,
            { color: message.startsWith("Error") ? "red" : "green" },
          ]}
        >
          {message}
        </Text>
      ) : null}


      {/* Navigation link to SignIn */}
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
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

export default SignUp;
