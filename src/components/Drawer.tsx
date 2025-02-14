// import * as React from 'react';
// import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { options } from './ActionArea';
import { Link } from 'react-router-dom';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function AnchorTemporaryDrawer() {
  
  const [open,setOpen] = useState(false);
  

  
 

  return (
    <div className=' inline-block md:hidden  '>
      
       
           <button onClick={()=>setOpen(true)} >options</button>
          
          <Drawer className='bg-black'
            anchor={"left"}
            open={open}
            onClose={()=> setOpen(false)}
          >
            <div className='w-[250px]  bg-gray-950 text-gray-300 h-full pt-[100px] p-[30px]'>
                <div>Options</div><hr className='mt-1'></hr>
                <div className='mt-[50px]'>
                {options.map((option)=><a href={option.link} className="mb-[10px]  hover:bg-gray-800 block rounded p-[10px] cursor-pointer">{option.title}</a>)}
                </div>
               
            
            </div>
            
            
          </Drawer>
        
      
    </div>
  );
}