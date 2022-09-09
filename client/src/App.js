import './App.css'
import Landing from './pages/Landing'
import Nav from './components/Nav'
import {Routes, Route} from 'react-router-dom'
import ProtectRoute from './utils/ProtectRoute'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Feed from './pages/Feed'
import ProfileDetails from './components/ProfileDetails'

function App() {
  return (
    <div className='App'>
        <Nav/>
        <main>
          <Routes>
            <Route path='/' element={<ProfileDetails/>}/>
            <Route path='/register' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route element = {<ProtectRoute/>}>
                <Route path='/feed' element={<Feed/>}/>
            </Route>
          </Routes>
          
        </main>
    </div>
  );
}

export default App;
