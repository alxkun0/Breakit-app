import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from 'firebase/auth';
import TopBar from '@/components/TopBar';

const Profiles = () => {
  const [email, setEmail] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [createdTasks, setCreatedTasks] = useState([
    { id: '1', task: 'Learn React Native' },
    { id: '2', task: 'Build a mobile app' },
  ]);
  const [completedTasks, setCompletedTasks] = useState([
    { id: '1', task: 'Set up Firebase' },
    { id: '2', task: 'Design home screen' },
  ]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setEmail(user.email); 
      console.log("User email:", user.email);
    }
  }, []);

  // this thing doesn't work
  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <ScrollView style={styles.scrollContent}>
        <View style={styles.content}>

        {/* Profile Picture */}
        <Image
          source={require('../assets/images/blankProf.jpg')} // Add the image URL
          style={styles.profilePic}
        />

        {/* Profile Details */}
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{email ? email.split('@')[0] : "Loading..."}</Text>
          <Text style={styles.profileText}>Email: {email ? email : "Loading..."}</Text>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          {/* Tasks Button */}
          <TouchableOpacity style={styles.tasksButton} onPress={toggleModal}>
            <Text style={styles.tasksText}>View Tasks</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for Tasks */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Your Tasks</Text>

            <Text style={styles.sectionTitle}>Created Tasks</Text>
            <FlatList
              data={createdTasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Text style={styles.taskItem}>{item.task}</Text>}
            />

            <Text style={styles.sectionTitle}>Completed Tasks</Text>
            <FlatList
              data={completedTasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Text style={styles.taskItem}>{item.task}</Text>}
            />

            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      
      </Modal>
      </ScrollView>
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
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileDetails: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 22,
    color: '#333',
    fontFamily: 'Roboto-Bold',
    marginBottom: 10,
  },
  profileText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Roboto-Regular',
    marginBottom: 5,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#FF6347', 
    borderRadius: 30,
  },
  logoutText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Roboto-Bold',
  },
  tasksButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
  },
  tasksText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Roboto-Bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
  },
  taskItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#FF6347', 
    borderRadius: 30,
  },
  closeText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Roboto-Bold',
  },
});

export default Profiles;
