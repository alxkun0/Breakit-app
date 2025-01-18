import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, TextInput, ScrollView } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import GeminiResponse from '@/alogic/GeminiResponse'; 
import genTextToFB from '@/alogic/genTextToFB';


const BottomSheet = ({  }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  
  // Prompt neccessities
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [skillLevel, setSkillLevel] = useState("");

  {/* Bottom Window */}
  const [isFormValid, setIsFormValid] = useState(false); 

  const toggleBottomWindow = () => {
    setIsExpanded((prev) => !prev);
    Animated.timing(slideAnimation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    console.log("BottomWindow is expanded.");
  };

  const windowHeight = Dimensions.get("window").height * 0.7;

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [windowHeight, 0],
  });

  // prevents receiving empty inputs or whitespaces 
  // disables the generate button until all fields are filled-up
  useEffect(() => {
    const isValid = projectName.trim() && projectDescription.trim() && timeFrame.trim() && skillLevel.trim();
    setIsFormValid(isValid);
  }, [projectName, projectDescription, timeFrame, skillLevel]);


  {/* Text generation from gemini, taskBox creation, writing to firebaseDB*/}
  const ResponseGeneration = async () => {
    try {
      console.log("Generating Response...");
      const generatedText = await GeminiResponse(projectName, projectDescription, timeFrame, skillLevel);
      // log the generatedText to confirm it has contents
      console.log(generatedText)

      const newTask = await genTextToFB(projectName, generatedText);
      console.log('Firebase Log:', newTask); 
      

      console.log("generatedText sent to genTextToJson for processing.");

      // clears the input fields and automatically closes the window
      setProjectName("");
      setProjectDescription("");
      setTimeFrame("");
      setSkillLevel("");
      toggleBottomWindow();
    } catch (error) {
      console.error("An error occurred: ", error)
    }
  };

  

  return (
    <View style={styles.container}>
      {/* Floating Add Button */}
      <View style={styles.floatingAddButtonPosition}>
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
          <Ionicons name="close" size={30} color="#FF3B30" />
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
            onPress={ResponseGeneration}
            style={[
              styles.submitButton,
              { backgroundColor: isFormValid ? "#4A90E2" : "#A9A9A9" },
            ]}
            disabled={!isFormValid}
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
    backgroundColor: 'transparent',
    zIndex: 10,
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
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -30 }],
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: "#4A90E2",
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    
  },
  floatingAddButtonPosition: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

    // Bottom Sheet
  bottomWindow: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: Dimensions.get('window').height * 0.65,
    backgroundColor: "#ffffff",
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 8,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 2,
  },
  bottomWindowTitle: {
    color: "#333333",
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  bottomWindowText: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'light',
    textAlign: 'left',
    flexDirection: 'row',
    marginBottom: 5,
  },
  bottomWindowTextInput: {
    width: '100%',
    height: 40,
    backgroundColor: "#F7F8FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 1,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: "600",
  },
});
