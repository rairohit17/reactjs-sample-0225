import AddTask from './AddTask';
import Card from './Card';
import { IoIosAddCircleOutline } from "react-icons/io";
export default function AllTasks() {
  return (
    <div className='px-[10px]'>
    <div className=' flex justify-between '>
    <div className='text-center mb-[50px]'>All Tasks</div>
    <AddTask></AddTask>
    </div>
      <Card
        status={'complete'}
        description="bring 2 kilos of onion "
        todo={'bring onions'}
        type={'important'}
        date={new Date()}
      ></Card>
    </div>
  );
}
