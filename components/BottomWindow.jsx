import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, TextInput, ScrollView } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import GeminiResponse from '@/api/GeminiResponse'; 

const BottomSheet = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [skillLevel, setSkillLevel] = useState("");

  const toggleBottomWindow = () => {
    setIsExpanded((prev) => !prev);
    Animated.timing(slideAnimation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const windowHeight = Dimensions.get("window").height * 0.6;

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [windowHeight, 0],
  });

  const handleGenerateContent = async () => {
    try {
      const response = await GeminiResponse(projectName, projectDescription, timeFrame, skillLevel);
      console.log("Generated Response:", response);

    } catch (error) {
      console.error("Error in generating content:", error);
    }

    // Clear the input fields and close the window
    setProjectName("");
    setProjectDescription("");
    setTimeFrame("");
    setSkillLevel("");
    toggleBottomWindow();
  };

  return (
    <View style={styles.container}>
      {/* Floating Add Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={toggleBottomWindow}
          style={styles.floatingAddButton}
        >
          <AntDesign name="plus" size={26} color="#f5f5f5" />
        </TouchableOpacity>
      </View>

      {/* Bottom Window */}
      <Animated.View
        style={[styles.bottomWindow, { transform: [{ translateY }] }]}
      >
        <Text style={styles.bottomWindowTitle}>Task Details</Text>
        <TouchableOpacity
          onPress={toggleBottomWindow}
          style={{ position: "absolute", top: 15, right: 20 }}
        >
          <Ionicons name="close" size={30} color="#f5f5f5" />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.bottomWindowText}>Project Name:</Text>
          <TextInput
            placeholder="Enter project name"
            style={styles.bottomWindowTextInput}
            value={projectName}
            onChangeText={setProjectName}
          />

          <Text style={styles.bottomWindowText}>Description:</Text>
          <TextInput
            placeholder="Ex. Learning Python Programming"
            style={styles.bottomWindowTextInput}
            value={projectDescription}
            onChangeText={setProjectDescription}
          />

          <Text style={styles.bottomWindowText}>Time Frame:</Text>
          <TextInput
            placeholder="Enter time frame"
            style={styles.bottomWindowTextInput}
            value={timeFrame}
            onChangeText={setTimeFrame}
          />

          <Text style={styles.bottomWindowText}>Skill Level:</Text>
          <TextInput
            placeholder="Enter skill level"
            style={styles.bottomWindowTextInput}
            value={skillLevel}
            onChangeText={setSkillLevel}
          />

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleGenerateContent}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Generate</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end', // Ensures bottom sheet appears at the bottom
  },

  text: {
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: 'light',
    textAlign: 'justify',
    marginTop: 10,
  },
  floatingAddButton: {
    position: 'absolute',
    bottom: 35,
    left: '50%',
    transform: [{ translateX: -30 }],
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: '#021520',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  // Bottom Sheet
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  bottomWindow: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '120%',
    backgroundColor: '#021520',
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
    elevation: 5,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  bottomWindowTitle: {
    color: '#f5f5f5',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  bottomWindowText: {
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: 'light',
    textAlign: 'left',
    flexDirection: 'row',
    marginBottom: 10,
  },
  bottomWindowTextInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#021520',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
