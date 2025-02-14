import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { IoIosAddCircleOutline } from "react-icons/io";

export default function AddTask(){
    return (
        <Dialog>
      <DialogTrigger asChild>
        <IoIosAddCircleOutline className="sm:text-3xl text-xl cursor-pointer"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[250px] bg-inherit">
        <DialogHeader>
          <DialogTitle className="text-gray-100 sm:text-2xl text-xl">Add Task</DialogTitle>
          <DialogDescription>
          Add a new task to stay organized and track your progress!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="  hidden sm:inline-block text-right text-gray-200">
              Title
            </Label>
            <Input id="title" placeholder="enter task" className="sm:col-span-3 col-span-5  text-gray-400" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right hidden sm:inline-block text-gray-100">
              Description
            </Label>
            <Input id="description" placeholder="enter description" className="sm:col-span-3 col-span-5 text-gray-400 " />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}



    
  
