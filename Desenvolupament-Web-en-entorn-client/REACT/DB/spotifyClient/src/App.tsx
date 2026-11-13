import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import HeaderCard from './Components/Header/HeaderCard'
import Play from './Pages/Authenticated/Play'
import Menu from './PageStructure/menu/menu'


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
      </Routes>
    </BrowserRouter>
  )
}
export default App