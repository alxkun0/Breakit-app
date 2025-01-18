import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TaskPage = ({ route }) => {
  const { taskTitle, taskData } = route.params; // passed from home.jsx
  
  // logs to confirm contents
  console.log("Task Title:", taskTitle); 
  console.log("Task Data:", taskData);

  // parses the data into an ARRAY 
  const tasksArray = taskData
    ? taskData.split(/(?=\d+\.\s)/).filter((task) => task.trim() !== '') // Regex splits at "digit followed by dot and space"
    : [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Task Title: {taskTitle}</Text>
          {tasksArray.length > 0 ? (
            tasksArray.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.itemNumber}></Text>
                <Text style={styles.itemText}>{item.trim()}</Text>
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
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#021520',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  itemNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#021520',
  },
  text: {
    fontSize: 16,
    color: '#021520',
    marginTop: 20,
  },
});

export default TaskPage;
