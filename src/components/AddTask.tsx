import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { createTask } from '../utils/DatabaseOperations';
import { Task } from '../utils/Task.schema';
import { toast, ToastContainer } from 'react-toastify';
import { firebaseErrorMessages } from '../utils/FirebaseErrors';

export default function AddTask() {
  const navigate = useNavigate();
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  

  function handleSubmit() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) navigate('/login'); // log in again if no auth tOken
    console.log('userEmail');
    const decodedToken = jwtDecode<any>(authToken as string);
    const userEmail = decodedToken.email;
    const newTask: Task = {
      userEmail,
      todo: task,
      description,
      type: 'not_important',
      status: 'not_started',
      date: Date.now(),
    };
    try {
      createTask(newTask)
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          toast.success(' task added successfully ', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            style: {
              backgroundColor: '#2d3748',
              color: '#e2e8f0',
            },
          });
        })
        .catch((err) => {
          console.log(err.message);
          const message =
            firebaseErrorMessages[err.code as string] || 'error adding task ';
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
      console.log(error.message);
      throw error;
    }
  }

  return (
    <Dialog>
      <ToastContainer />
      <DialogTrigger asChild>
        <IoIosAddCircleOutline className="sm:text-3xl text-xl cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[250px] bg-inherit">
        <DialogHeader>
          <DialogTitle className="text-gray-100 sm:text-2xl text-xl">
            Add Task
          </DialogTitle>
          <DialogDescription>
            Add a new task to stay organized and track your progress!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="title"
              className="  hidden sm:inline-block text-right text-gray-200"
            >
              Title
            </Label>
            <Input
              onChange={(e) => setTask(e.target.value)}
              id="title"
              placeholder="enter task"
              className="sm:col-span-3 col-span-5  text-gray-400"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="description"
              className="text-right hidden sm:inline-block text-gray-100"
            >
              Description
            </Label>
            <Input
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="enter description"
              className="sm:col-span-3 col-span-5 text-gray-400 "
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
