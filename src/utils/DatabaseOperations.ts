import { db } from '../firebase.config';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { Task } from './Task.schema';

const tasksCollection = collection(db, 'tasks');

export const createTask = async (task: Omit<Task, 'id'>) => {
  try {
    const addDocument = await addDoc(tasksCollection, task);
    return addDocument.id;
  } catch (err: any) {
    console.log('error occured : ' + err.message);
    throw err;
  }
};
export async function updateTask(
  userEmail: string,
  taskId: string,
  updatedElements: Partial<Task>
) {
  try {
    const getDocument = await doc(db, 'tasks', taskId);
    const taskSnap = await getDoc(getDocument);
    if (!taskSnap.exists()) throw new Error('Task not found');
    const taskData: Task = taskSnap.data() as Task;
    if (taskData.userEmail !== userEmail)
      throw new Error('Unauthorized to update this task');
    await updateDoc(getDocument, updatedElements);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export async function getAllTasksOfUser(email: string): Promise<Task[]> {
  try {
    const q = query(collection(db, 'tasks'), where('userEmail', '==', email));
    const querySnapshot = await getDocs(q);
    const tasks: Task[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, 'id'>),
    }));
    return tasks;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function deleteTask(userEmail: string, taskId: string) {
  try {
    const getDocument = await doc(db, 'tasks', taskId);
    const taskSnap = await getDoc(getDocument);
    if (!taskSnap.exists()) throw new Error('Task not found');
    const taskData: Task = taskSnap.data() as Task;
    if (taskData.userEmail !== userEmail)
      throw new Error('Unauthorized to update this task');
    await deleteDoc(getDocument);
  } catch (error: any) {
    console.log('error occured ' + error.message);
    throw error;
  }
}
