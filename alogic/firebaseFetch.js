import { getDatabase, ref, set, onValue, off, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Fetch tasks for the logged-in user
const firebaseFetch = (setTasks) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.log("User not authenticated.");
    return null;
  }

  const db = getDatabase();
  const tasksRef = ref(db, `users/${user.uid}/tasks`);

  // Listener for tasks
  const listener = onValue(
    tasksRef,
    (snapshot) => {
      const data = snapshot.val() || {};
      const tasks = Object.keys(data).map((taskId) => ({
        id: taskId,
        ...data[taskId],
      }));

      // Favorited tasks first, then by creation date 
      const sortedTasks = tasks.sort((a, b) => {
        if (a.isFavorite === b.isFavorite) {
          // Favorites order is by date created
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return a.isFavorite ? -1 : 1; // Favorites appear first
      });

      setTasks(sortedTasks); 
    },
    (error) => {
      console.error("Error fetching tasks:", error);
    }
  );

  // Return cleanup function to remove the listener
  return () => {
    off(tasksRef, "value", listener);
  };
};

// Save task data to Firebase
export const updateFBTask = (taskId, taskData) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.log("User not authenticated.");
    return;
  }

  const db = getDatabase();
  const taskRef = ref(db, `users/${user.uid}/tasks/${taskId}`);
  
  set(taskRef, taskData)
    .then(() => console.log(`Task ${taskId} saved successfully.`))
    .catch((error) => console.error("Error saving task to Firebase:", error));
};

// Delete task data from Firebase
export const deleteFBTask = (taskId) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.log("User not authenticated.");
    return;
  }

  const db = getDatabase();
  const taskRef = ref(db, `users/${user.uid}/tasks/${taskId}`);
  
  remove(taskRef)
    .then(() => console.log(`Task ${taskId} deleted successfully.`))
    .catch((error) => console.error("Error deleting task from Firebase:", error));
};

export default firebaseFetch;
