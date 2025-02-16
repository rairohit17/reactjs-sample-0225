import AddTask from '../components/AddTask';
import Card from '../components/Card';
import { jwtDecode } from 'jwt-decode';
import { getAllTasksOfUser } from '../utils/DatabaseOperations';
import { Task } from '../utils/Task.schema';
import { firebaseErrorMessages } from '../utils/FirebaseErrors';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';

export default function ImportantTasks() {
  const [importantTasks, setImportantTasks] = useState<Task[]>([]);

  const authToken = localStorage.getItem('authToken');
  if (!authToken) window.location.href = '/login'; // log in again if no auth tOken
  console.log('userEmail');
  const decodedToken = jwtDecode<any>(authToken as string);
  const userEmail = decodedToken.email;
  useEffect(() => {
    try {
      getAllTasksOfUser(userEmail)
        .then((res) => {
          const important = res.filter((task) => task.type === 'important');
          setImportantTasks(important);
        })
        .catch((err) => {
          console.log(err.message);
          const message =
            firebaseErrorMessages[err.code as string] ||
            'an unexpected error occured';
          toast.warn(message, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            style: {
              backgroundColor: '#2d3748',
              color: '#e2e8f0',
            },
          });
        });
    } catch (error: any) {
      console.log('error getting tasks : ' + error.message);
    }
  }, [importantTasks]);

  return (
    <div className="px-[10px] overflow-hidden  overflow-y-auto no-scrollbar h-full ">
      <ToastContainer/>
      <div className=" flex justify-between ">
        <div className="text-center mb-[50px]">Important Tasks</div>
        <AddTask></AddTask>
      </div>
      <div className="flex gap-5 flex-wrap w-full">
        {importantTasks.map((task) => (
          <Card
            id={task.id as string}
            todo={task.todo}
            description={task.description}
            status={task.status}
            type={task.type}
          ></Card>
        ))}
      </div>
    </div>
  );
}
