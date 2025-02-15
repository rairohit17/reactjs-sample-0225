import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import ActionArea from './pages/ActionArea';
import AllTasks from './pages/AllTasks';
import ImportantTasks from './pages/ImportantTasks';
import CompletedTasks from './pages/CompletedTasks';
import IncompleteTasks from './pages/IncompleteTasks';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';

function Layout() {
  const location = useLocation();

  return (
    <div className="text-white">
      {/* Render Header only if the route is NOT '/signup' */}
      {location.pathname !== '/signup' && location.pathname !== '/login' && (
        <Header />
      )}

      <Routes>
        <Route path="/" element={<ActionArea />}>
          <Route index element={<AllTasks />} />
          <Route path="/importantTasks" element={<ImportantTasks />} />
          <Route path="/completedTasks" element={<CompletedTasks />} />
          <Route path="/incompleteTasks" element={<IncompleteTasks />} />
        </Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
