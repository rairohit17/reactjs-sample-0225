import AnchorTemporaryDrawer from './Drawer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase.config';

export default function Header() {
  const navigate = useNavigate();

 
  return (
    <div className="flex justify-between p-[10px]">
      <AnchorTemporaryDrawer></AnchorTemporaryDrawer>
      <div className=""> userName</div>
    </div>
  );
}
