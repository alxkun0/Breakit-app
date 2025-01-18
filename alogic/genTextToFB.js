import { getDatabase, ref, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Firebase Realtime Database function
const genTextToFB = async (taskTitle, generatedText) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Prepare the data to be stored
      const newData = {
        title: taskTitle,
        task: generatedText,
        createdAt: new Date().toISOString(), // Useful for sorting or filtering tasks
      };

      // Reference to the user's tasks in Firebase
      const db = getDatabase();
      const userTasksRef = ref(db, `users/${user.uid}/tasks`);

      // Push new task to Firebase Realtime Database
      await push(userTasksRef, newData);

      console.log("Task saved to Firebase Realtime Database: ", newData);

      return newData; // Optionally return the saved data for confirmation

    } else {
      console.log("User is not authenticated. Task not saved.");
      throw new Error("User not authenticated");
    }
  } catch (error) {
    console.error("Error saving task to Firebase:", error);
    throw error;
  }
};

export default genTextToFB;
