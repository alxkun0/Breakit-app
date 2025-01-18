import { getDatabase, ref, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Pass Generated Text to write in Realtime Database (for global access of Tasks)
const genTextToFB = async (taskTitle, generatedText) => {
  try {
    // initialize auth and retrieve currently signed-in user
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // prepare the structure of newData for firebaseDB
      const newData = {
        title: taskTitle,
        task: generatedText,
        createdAt: new Date().toISOString(), // Useful for sorting or filtering tasks
      };

      // get user's Tasks Reference
      const db = getDatabase();
      const tasksRef = ref(db, `users/${user.uid}/tasks`);

      // push newly generated Tasks to the firebaseDB
      await push(tasksRef, newData);

      console.log("Task saved to FirebaseDB: ", newData);

      return newData; 

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
