import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import HeaderCard from './Components/Header/HeaderCard'
import Play from './Pages/Authenticated/Play'
import Menu from './PageStructure/menu/menu'
import SongManagment from './Pages/Admin/SongManagment'


function App() {
  return (
    <BrowserRouter>
      <HeaderCard
        headerInfo={{
          user: 'Eloi',
          data: new Date().toLocaleDateString('ca-ES'),
        }}
      />
      <Menu />
      <Routes>
        <Route path="/Play" element={<Play />}></Route>
        <Route path="/SongManagment" element={<SongManagment/>} ></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App