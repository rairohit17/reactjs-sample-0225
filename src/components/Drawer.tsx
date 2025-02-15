// import * as React from 'react';
// import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { options } from '../pages/ActionArea';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
type Anchor = 'top' | 'left' | 'bottom' | 'right';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function AnchorTemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("")
  
   function getImage(){

    const randomNumber = Math.floor(Math.random() * 1000);
      // Use a smaller image size for better performance
      const directImageUrl = `https://picsum.photos/id/${randomNumber}/200/200`;
      return directImageUrl;
  }

  const authToken = localStorage.getItem('authToken');
  if (!authToken) window.location.href = '/login'; // log in again if no auth tOken
  console.log('userEmail');
  const decodedToken = jwtDecode<any>(authToken as string);
  const userEmail = decodedToken.email;


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

  return (
    <div className=" inline-block md:hidden  ">
      <RxHamburgerMenu
        className="text-gray-300 text-xl mt-3"
        onClick={() => setOpen(true)}
      />

      <Drawer
        className="bg-black"
        anchor={'left'}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="w-[250px]  bg-gray-950 text-gray-300 h-full  p-[30px]">
          <div className='flex'>
            <img className='h-[50px] rounded-[30px]' src={getImage()} alt="" />
            <div className='mt-[10px] pl-[10px]'>{formatEmail(userEmail)}</div>
          </div>
          <div className='pt-[100px]'>Task Options</div>
          <hr className="mt-1"></hr>
          <div className="mt-[50px]">
            {options.map((option) => (
              <a
                href={option.link}
                className="mb-[10px]  hover:bg-gray-800 block rounded p-[10px] cursor-pointer"
              >
                {option.title}
              </a>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
