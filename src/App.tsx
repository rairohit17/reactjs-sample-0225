import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import ActionArea from './components/ActionArea';
import AllTasks from './components/AllTasks';
import ImportantTasks from './components/ImportantTasks';
import CompletedTasks from './components/CompletedTasks';
import IncompleteTasks from './components/IncompleteTasks';
import SignupPage from './components/Signup';
import LoginPage from './components/Login';

function Layout() {
  const location = useLocation();

  return (
    <div className="text-white">
      {/* Render Header only if the route is NOT '/signup' */}
      {(location.pathname !== '/signup' && location.pathname !== '/login') && <Header />}

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
