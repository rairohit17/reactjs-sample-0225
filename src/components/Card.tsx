import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { CiStar } from "react-icons/ci";
type Values = {
  todo: string;
  status: string;
  type: string;
  date: Date;
  description: string;
};
import { useState } from 'react';
import { FaStar } from "react-icons/fa";
export default function Card({
  todo,
  status,
  type,
  date,
  description,
}: Values) {
  const todo1 = todo;
  const [isImportant, setIsImportant] = useState(false)

  return (
    <div className="sm:w-[250px] sm:h-[250px] h-[180px] w-[150px] relative bg-slate-900 border  rounded-xl shadow-md">
      <div className="w-full font-bold sm:text-2xl text-[16px] text-center text-gray-400 sm:pt-[30px] pt-[4px] font-mono">
        {todo}
      </div>
      <div className="mt-[30px] text-center sm:text-sm text-[11px] text-gray-400 break-words px-[20px]">
  {description} sdhsbdhshdbsdhsdhsbdhsbdhsbhdssdsdsdsdsdsds
</div>
      <div className='flex absolute bottom-3'>
        <DropdownMenu>
          <DropdownMenuTrigger className=" hover:opacity-65 font-orbitron rounded border-none sm:text-xl mx-5 px-1 text-gray-400"> status</DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-900 text-sm text-gray-400 rounded-xl">
            

            <DropdownMenuItem className=' text-xs sm:text-sm'>Not Started</DropdownMenuItem>
            <DropdownMenuItem  className=' text-xs sm:text-sm'>In Progress</DropdownMenuItem>
            <DropdownMenuItem  className=' text-xs sm:text-sm'>Completed</DropdownMenuItem>


          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CiStar onClick={()=>setIsImportant(true)} className={` ${isImportant?"hidden" :"inline-block"} absolute bottom-3 right-4 sm:text-2xl`}  />
      <FaStar onClick={()=>setIsImportant(false)} className={`${isImportant?"inline-block" :"hidden"} absolute bottom-3 right-4 sm:text-2xl`} ></FaStar>

    </div>
  );
}
