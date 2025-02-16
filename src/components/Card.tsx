import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast, ToastContainer } from 'react-toastify';
import { CiStar } from 'react-icons/ci';
import { deleteTask, updateTask } from '../utils/DatabaseOperations';
type Values = {
  todo: string;
  status: Status;
  type: string;
  description: string;
  id: string;
};
import { jwtDecode } from 'jwt-decode';
import { MdDeleteOutline } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
type Type = 'important' | 'not_important';
type Status = 'completed' | 'in_progress' | 'not_started';

export default function Card({ todo, status, type, description, id }: Values) {
  let initial: boolean = type == 'important' ? true : false;
  const [isImportant, setIsImportant] = useState(initial);
  const authToken = localStorage.getItem('authToken');
  if (!authToken) window.location.href = '/login'; // log in again if no auth tOken
  console.log('userEmail');
  const decodedToken = jwtDecode<any>(authToken as string);
  const userEmail = decodedToken.email;
  useEffect(() => {
    let newtype: Type;
    if (isImportant) {
      newtype = 'important';
    } else {
      newtype = 'not_important';
    }

    updateTask(userEmail, id, { type: newtype }).then(() => {
      type = newtype;
    });
  }, [isImportant]);
  function handleDelete() {
    try {
      deleteTask(userEmail, id).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        toast.success(' task deleted successfully ', {
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
      });
    } catch (err: any) {
      console.log('error occured : ' + err.message);
    }
  }
  function handleFunction(presentState: Status) {
    try {
      updateTask(userEmail, id, { status: presentState }).then(() => {
        console.log('successfully updated');
        window.location.reload();
      });
    } catch (err) {
      console.log('error' + err);
      throw err;
    }
  }

  return (
    <div className="sm:w-[250px] sm:h-[250px] h-[180px] w-[150px] relative bg-slate-900 border  rounded-xl shadow-md">
      <ToastContainer/>
      <div className="w-full font-bold sm:text-2xl text-[16px] text-center break-words text-gray-400 sm:pt-[30px] pt-[20px] px-[5px] font-mono">
        {todo}
      </div>
      <div className="sm:mt-[30px] mt-[10px] text-center sm:text-sm text-[11px] text-gray-400 break-words px-[20px]">
        {description}
      </div>
      <div className="flex absolute bottom-3">
        <DropdownMenu>
          <DropdownMenuTrigger className=" hover:opacity-65 font-orbitron rounded border-none sm:text-xl text-xs sm:mx-5 mx-[5px] px-1 text-gray-400">
            {status
              .replace(/_/g, ' ')
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-900 text-sm text-gray-400 rounded-xl">
            <DropdownMenuItem
              onClick={() => handleFunction('not_started')}
              className=" text-xs sm:text-sm"
            >
              Not Started
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleFunction('in_progress')}
              className=" text-xs sm:text-sm"
            >
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleFunction('completed')}
              className=" text-xs sm:text-sm"
            >
              Completed
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="absolute bottom-3 flex right-4 sm:-[15px] gap-[8px] sm:pb-0 pb-[2px]">
        <CiStar
          onClick={() => setIsImportant(true)}
          className={` ${isImportant ? 'hidden' : 'inline-block'} cursor-pointer right-4 sm:text-2xl`}
        />
        <FaStar
          onClick={() => setIsImportant(false)}
          className={`${isImportant ? 'inline-block' : 'hidden'} cursor-pointer  right-4 sm:text-2xl`}
        ></FaStar>

        <MdDeleteOutline
          onClick={handleDelete}
          className="sm:text-2xl cursor-pointer"
        />
      </div>
    </div>
  );
}
