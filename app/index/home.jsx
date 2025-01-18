import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TopBar from '@/components/TopBar';
import BottomSheet from '@/components/BottomWindow';
import firebaseFetch from '../../alogic/firebaseFetch';

const Home = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);

  // utilizes firebaseFetch
  useEffect(() => {
    const getTasks = async () => {
      try {
        const userTasks = await firebaseFetch();
        setTasks(userTasks); // Set fetched tasks in state
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    getTasks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              onPress={() => {
                console.log('Navigating to task:', task.title);
                navigation.navigate('TaskPage', { taskTitle: task.title, taskData: task.task });
              }}
            >
              <View style={styles.taskBox}>
                <Text style={styles.text}>{task.title}</Text>
                <View style={styles.taskBoxWidgets}>
                  <TouchableOpacity>
                    <MaterialCommunityIcons name="star-outline" size={24} color="#021520" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="#021520" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.text}>No tasks available.</Text>
        )}
      </ScrollView>
      <BottomSheet />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingVertical: 10,
    paddingTop: 80,
  },
  text: {
    color: '#021520',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'justify',
  },
  taskBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderColor: '#021520',
    padding: 20,
    marginVertical: 7,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 5,
  },
  taskBoxWidgets: {
    flexDirection: 'row',
  },
});

export default Home;
