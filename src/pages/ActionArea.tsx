import { Outlet, Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const options = [
  {
    title: 'All tasks',
    link: '/',
  },
  {
    title: 'Important tasks',
    link: '/importantTasks',
  },
  {
    title: 'Completed tasks',
    link: '/completedTasks',
  },
  {
    title: 'Incomplete tasks',
    link: '/incompleteTasks',
  },
];

export default function ActionArea() {
  const navigate = useNavigate();
  const [imageUrlFinal, setImageUrlFinal] = useState<string>('');
  const authToken = localStorage.getItem('authToken');
  if (!authToken) window.location.href = '/login'; // log in again if no auth tOken
  console.log('userEmail');
  const decodedToken = jwtDecode<any>(authToken as string);
  const userEmail = decodedToken.email;
  function getImage(){

    const randomNumber = Math.floor(Math.random() * 1000);
      // Use a smaller image size for better performance
      const directImageUrl = `https://picsum.photos/id/${randomNumber}/200/200`;
      return directImageUrl;
  }
  function formatEmail(email: string, visibleChars = 3) {
    // Validate email
    if (!email.includes('@')) {
      throw new Error('Invalid email address');
    }

    const [localPart, domain] = email.split('@');

    // Handle short local parts
    if (localPart.length <= visibleChars) {
      return `${localPart}@${domain}`;
    }

    const visible = localPart.slice(0, visibleChars);
    return `${visible}...@${domain}`;
  }
  useEffect(()=>{
    setImageUrlFinal(getImage())
  },[])

  

  return (
    <div className="flex gap-4 p-2">
      <div className="h-[90vh] hidden md:inline-block w-1/6 border border-gray-400 rounded-md px-[10px] flex-col">
        <div className="flex gap-1 items-center">
          {imageUrlFinal && (
            <img 
              className="lg:w-[50px] lg:h-[50px]  object-cover rounded-full mt-[20px] md:h-[30px] md:w-[30px]"
              src={imageUrlFinal}
              alt=""
            />
          )}
          <div className="pt-[10px]  text-[9px] lg:text-[12px] ">{formatEmail(userEmail)}</div>
        </div>
        <div className="mt-[50px] text-sm lg:text-xl">Task Categories</div>
        <hr className="mt-1" />
        <div className="md:text-xs lg:text-[16px] mt-[40px]">
          {options.map((option) => (
            <Link
              key={option.link}
              to={option.link}
              className="mb-[10px] hover:bg-gray-800 block rounded p-[10px] cursor-pointer"
            >
              {option.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-gray-400 w-full h-[90vh] md:w-5/6 border rounded-md p-2">
        <Outlet />
      </div>
    </div>
  );
}
