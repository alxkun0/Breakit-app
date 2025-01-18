import { getDatabase, ref, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseFetch = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Get the user's task reference
      const db = getDatabase();
      const tasksRef = ref(db, `users/${user.uid}/tasks`);

      // Fetch tasks from Firebase
      const snap = await get(tasksRef);

      if (snap.exists()) {
        const tasks = [];
        snap.forEach((childSnapshot) => {
          const task = childSnapshot.val();
          tasks.push({
            id: childSnapshot.key,
            title: task.title,
            task: task.task,
            createdAt: task.createdAt,
          });
        });

        return tasks; // returns task to TaskPage for displaying
      } else {
        console.log("No tasks found in Firebase.");
        return [];
      }
    } else {
      console.log("User is not authenticated.");
      throw new Error("User not authenticated");
    }
  } catch (error) {
    console.error("Error fetching tasks from Firebase:", error);
    throw error;
  }
};

export default firebaseFetch;
