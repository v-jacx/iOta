import './App.css'
import Landing from './pages/Landing'
import Nav from './components/Nav'
import {Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Feed from './pages/Feed'

function App() {
  return (
    <div className='App'>
        <Nav/>
        <main>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/register' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/feed' element={<Feed/>}/>
          </Routes>
        </main>
    </div>
  );
}

export default App;
