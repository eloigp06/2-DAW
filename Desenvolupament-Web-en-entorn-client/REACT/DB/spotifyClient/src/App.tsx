import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import HeaderCard from './Components/Header/HeaderCard'
import Play from './Pages/Authenticated/Play'
import Menu from './PageStructure/menu/menu'
import SongManagment from './Pages/Admin/SongManagment'
import Public from './Pages/Public/Public'
import HisyotyPage from './Pages/Authenticated/HisyotyPage'
import PlayListsPage from './Pages/Authenticated/PlayListsPage'


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
        <Route path="/Public" element={<Public />}></Route>
        <Route path="/Play" element={<Play />}></Route>
        <Route path="/PlayListsPage" element={<PlayListsPage />}></Route>
        <Route path="/HisyotyPage" element={<HisyotyPage />}></Route>
        <Route path="/SongManagment" element={<SongManagment/>} ></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App