import AnchorTemporaryDrawer from './Drawer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';
import { IoIosLogOut } from 'react-icons/io';

export default function Header() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      // If there's no authToken, redirect to login
      navigate('/login');
      return;
    }

    // listen  for changes in Firebase authentication state ie a user s
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        //  if there is no user in firebasse then return
        localStorage.removeItem('authToken');
        navigate('/login');
        return;
      }

      // check if the local storage has a valid auth token
      try {
        const idToken = await user.getIdToken();
        if (authToken !== idToken) {
          // If the authToken doesn't match firebase auth token then it has been tampered therefore return to login page
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    });

    // cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]);
  return (
    <div className="flex justify-between p-[10px]">
      <AnchorTemporaryDrawer></AnchorTemporaryDrawer>
      <div className="text-4xl text-gray-400 md:font-bold md:text-gray-100 font-extrabold">
        Task Board
      </div>
      <div className='md:flex hidden '>      <div className='lg:text-[15px] text-xs my-3'>"Tired of endless tasks? Join the raffle and test your luck!"</div>
      <button onClick={()=>window.location.href="https://lottery-gzlk-git-master-rohits-projects-ada12471.vercel.app/"} className='mx-[5px] bg-gray-600 rounded-md px-[5px]'>Participate</button>
      </div>
      <IoIosLogOut onClick={()=>{
        localStorage.removeItem("authToken");
        window.location.reload();
      }} className=" text-2xl   text-gray-300 mt-2 cursor-pointer " />
    </div>
  );
}
