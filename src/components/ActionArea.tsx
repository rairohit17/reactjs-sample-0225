import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"


export const options = [
    {
     title:"All tasks",
     link:"/"
    } ,
    {
     title:"Important tasks",
     link:"/importantTasks"

    } ,
    {
     title:"Completed tasks",
     link:"/completedTasks"
    } ,
    {
     title:"Incomplete tasks",
     link:"/incompleteTasks"

    } ,
    
 ]

export default function  ActionArea(){
     
    return (
        <div className="flex gap-4 p-2 ">
            <div  className=" h-[90vh] hidden md:inline-block w-1/6 border border-gray-400 rounded-md px-[5px]  flex-col ">
            <div className=" mt-[50px] text-sm lg:text-xl">Options</div><hr className="mt-1"></hr>
            <div className="md:text-xs lg:text-[16px]  mt-[40px] ">
                {options.map((option)=><Link to={option.link} className="mb-[10px]  hover:bg-gray-800 block rounded p-[10px] cursor-pointer">{option.title}</Link>)}
                
            </div>
             
            </div>
            <div className=" border-gray-400 w-full h-[90vh]  md:w-5/6 border rounded-md  p-2  " >
                <Outlet></Outlet>

            </div>
        </div>
    )


}