import './App.css'
import Landing from './pages/Landing'
import Nav from './components/Nav'
import {Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp';
function App() {
  return (
    <div className='App'>
        <Nav/>
        <main>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/register' element={<SignUp/>}/>
          </Routes>
        </main>
    </div>
  );
}

export default App;
