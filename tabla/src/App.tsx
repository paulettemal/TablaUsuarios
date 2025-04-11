

import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Principal from './pages/Principal'
function App() {

  return (
    <>
      <div className='flex flex-row'>
        <div className='bg-[#2A3042] h-screen p-[5vw] flex flex-col'>
          <Sidebar>
          </Sidebar>
        </div>
        <div className='bg-[#f6f6f6] flex-1'>
          <div>
            <Header></Header>
          </div>
          <Principal/>
        </div>
      </div>
    </>
  )
}

export default App
