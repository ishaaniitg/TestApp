import Reg from "./Components/Reg"
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import Home from "./Components/Home"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"   element = {<Home/>}/>
      <Route path="/register" element = {<Reg/>}/>
      <Route path="/login"  element = {<Login/>}/>
      <Route path = '/dashboard' element = {<Dashboard/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
