import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressBar } from 'react-native-paper'; 
import TopBar from '../../components/TopBar';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskPage = ({ route }) => {
  const { taskTitle, taskData } = route.params;

  // logs to confirm contents
  console.log("Task Title:", taskTitle);
  console.log("Task Data:", taskData);

  // Parse task data into an array
  const tasksArray = taskData
    ? taskData.split(/\d+\.\s/).filter((task) => task.trim() !== '')
    : [];

  // Track completion for each task
  const [taskCompletion, setTaskCompletion] = useState(Array(tasksArray.length).fill(false));

  // Load completion state from AsyncStorage when the component mounts
  useEffect(() => {
    const loadCompletionStatus = async () => {
      try {
        const savedStatus = await AsyncStorage.getItem(`taskCompletion_${taskTitle}`);
        if (savedStatus) {
          setTaskCompletion(JSON.parse(savedStatus));
        }
      } catch (error) {
        console.error("Error loading task completion status:", error);
      }
    };

    loadCompletionStatus();
  }, [taskTitle]); // Runs only when taskTitle changes

  // Save completion status to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCompletionStatus = async () => {
      try {
        await AsyncStorage.setItem(
          `taskCompletion_${taskTitle}`,
          JSON.stringify(taskCompletion)
        );
      } catch (error) {
        console.error("Error saving task completion status:", error);
      }
    };

    saveCompletionStatus();
  }, [taskCompletion, taskTitle]); // Runs whenever taskCompletion or taskTitle changes

  // Handle completion button press
  const handleCompletion = (index) => {
    let newCompletion = [...taskCompletion];
    newCompletion[index] = !newCompletion[index]; // Toggle completion (true or false)
    setTaskCompletion(newCompletion);
  };

  // Calculate total progress based on completed tasks
  const completedTasks = taskCompletion.filter(completed => completed).length;
  const overallProgress = tasksArray.length ? completedTasks / tasksArray.length : 0;

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>{taskTitle}</Text>

          {/* Progress Bar for all tasks combined */}
          <ProgressBar
            progress={overallProgress}
            color="#021520" // Primary color for progress bar
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            {Math.round(overallProgress * 100)}% Complete
          </Text>

          {tasksArray.length > 0 ? (
            tasksArray.map((item, index) => (
              <View key={index} style={styles.taskCard}>
                <View style={styles.taskContent}>
                  <Text style={styles.itemNumber}>{index + 1}.</Text>
                  <Text style={styles.itemText} numberOfLines={2}>{item.trim()}</Text> {/* Wrapping text */}
                </View>

                {/* Check Icon Button */}
                <TouchableOpacity
                  style={[
                    styles.checkButton,
                    { backgroundColor: taskCompletion[index] ? '#28a745' : '#fff' }, // Completed color
                  ]}
                  onPress={() => handleCompletion(index)}
                >
                  <MaterialCommunityIcons
                    name={taskCompletion[index] ? "check-circle" : "circle-outline"}
                    size={24}
                    color={taskCompletion[index] ? "#fff" : "#021520"} // Completed check icon color
                  />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.text}>No tasks available for this project.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollContent: {
    paddingVertical: 10,
    paddingTop: 80,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#021520',
    marginBottom: 20,
    textAlign: 'center',
  },
  taskCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 30,
  },
  itemNumber: {
    fontSize: 18,
    fontWeight: '500',
    color: '#021520', 
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
    flexWrap: 'wrap', 
  },
  progressBar: {
    height: 8,
    marginVertical: 20,
    borderRadius: 5,
    backgroundColor: "#8D918D",
  },
  progressText: {
    fontSize: 14,
    color: '#000', 
    textAlign: 'center',
    marginBottom: 20,
  },
  checkButton: {
    padding: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TaskPage;
