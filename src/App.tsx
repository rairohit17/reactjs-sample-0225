import { useState } from 'react'
import "./index.css"
import Header from './components/Header'
import ActionArea from "./components/ActionArea"
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import AllTasks from './components/AllTasks'
import ImportantTasks from './components/ImportantTasks'
import CompletedTasks from './components/CompletedTasks'
import IncompleteTasks from './components/IncompleteTasks'
function App() {
  const [count, setCount] = useState(0)

  return (
   <div  className='text-white'>
    <Header></Header>
    <Router>
      <Routes>
        <Route   path = "/" element={<ActionArea/>}>
        <Route index element={<AllTasks></AllTasks>} ></Route>
        <Route path="/importantTasks" element={<ImportantTasks></ImportantTasks>} ></Route>
        <Route path="/completedTasks" element={<CompletedTasks></CompletedTasks>} ></Route>
        <Route path="/incompleteTasks" element={<IncompleteTasks></IncompleteTasks>} ></Route>

        </Route>
      </Routes>
    
    
   

   </Router>
   </div>
  )
}

export default App
