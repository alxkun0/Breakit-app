import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import TopBar from '@/components/TopBar';
import BottomSheet from '@/components/BottomWindow';
import firebaseFetch, { updateFBTask, deleteFBTask } from '../../alogic/firebaseFetch';

const Home = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [renameMode, setRenameMode] = useState(false);

  useEffect(() => {
    const unsubscribe = firebaseFetch(setTasks);
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const toggleFavorite = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, isFavorite: !task.isFavorite };
          updateFBTask(taskId, updatedTask);
          return updatedTask;
        }
        return task;
      })
    );
  };

  const handleRenameTask = () => {
    if (selectedTask && newTaskTitle.trim()) {
      const updatedTask = { ...selectedTask, title: newTaskTitle.trim() };
      updateFBTask(selectedTask.id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === selectedTask.id ? updatedTask : task))
      );
      setRenameMode(false);
      setMenuVisible(false);
      setSelectedTask(null);
      setNewTaskTitle('');
    }
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      deleteFBTask(selectedTask.id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask.id));
      setMenuVisible(false);
      setSelectedTask(null);
    }
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.isFavorite - a.isFavorite);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <View key={task.id} style={styles.taskBox}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('TaskPage', { taskTitle: task.title, taskData: task.task });
                }}
                style={{ flex: 1 }}
              >
                <Text style={styles.text}>{task.title}</Text>
              </TouchableOpacity>
              <View style={styles.taskBoxWidgets}>
                <TouchableOpacity onPress={() => toggleFavorite(task.id)}>
                  <MaterialCommunityIcons
                    name={task.isFavorite ? 'star' : 'star-outline'}
                    size={24}
                    color={task.isFavorite ? '#FFD700' : '#021520'}
                  />
                </TouchableOpacity>
                <Menu
                  visible={menuVisible && selectedTask?.id === task.id}
                  onDismiss={() => setMenuVisible(false)}
                  anchor={
                    <TouchableOpacity
                      onPress={(event) => {
                        const { nativeEvent } = event;
                        setMenuAnchor({ x: nativeEvent.pageX, y: nativeEvent.pageY });
                        setSelectedTask(task);
                        setMenuVisible(true);
                      }}
                    >
                      <MaterialCommunityIcons name="dots-vertical" size={24} color="#021520" />
                    </TouchableOpacity>
                  }
                >
                  {!renameMode ? (
                    <>
                      <Menu.Item
                        onPress={() => {
                          setRenameMode(true);
                          setMenuVisible(false);
                        }}
                        title="Rename"
                      />
                      <Menu.Item onPress={handleDeleteTask} title="Delete" />
                    </>
                  ) : (
                    <View style={styles.renameContainer}>
                      <TextInput
                        style={styles.renameInput}
                        placeholder="New task title"
                        value={newTaskTitle}
                        onChangeText={setNewTaskTitle}
                      />
                      <TouchableOpacity onPress={handleRenameTask} style={styles.menuButton}>
                        <Text style={styles.menuText}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </Menu>
              </View>
            </View>
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
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingVertical: 10,
    paddingTop: 80,
  },
  text: {
    color: '#021520',
    fontSize: 18,
    fontWeight: '400',
  },
  taskBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5', 
    padding: 20,
    marginVertical: 7,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 5, 
  },
  taskBoxWidgets: {
    flexDirection: 'row',
  },
  renameContainer: {
    alignItems: 'center',
    padding: 10,
  },
  renameInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#021520', 
    borderRadius: 5,
  },
  menuText: {
    color: '#fff', 
    textAlign: 'center',
  },
});

export default Home;
