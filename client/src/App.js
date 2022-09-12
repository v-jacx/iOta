import './App.css'
import Landing from './pages/Landing'
import Nav from './components/Nav'
import {Routes, Route} from 'react-router-dom'
import ProtectRoute from './utils/ProtectRoute'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Feed from './pages/Feed'
import ProfileDetails from './components/ProfileDetails'
import axios from 'axios'
import {connect} from 'react-redux'
import { SetUser, SetFeed, SetFollowingIds} from './store/actions/UserActions'
import BASE_URL from './globals'
import { useEffect} from 'react'
import Follow from './pages/Follow'
import PostCard from './components/PostCard'


function App({user, setUser, setFeed, setFollowingIds}) {

  const getUser = async()=>{
      const res = await axios.get(`${BASE_URL}/profile/${user.user_id}`).catch(function(e){console.log(e)})
      
      setUser(res.data)
      let userFollowing = []
      res.data.following.map((follow)=>{
        userFollowing.push(follow.follow.id)
    })
  
      setFeed(res.data.following)
      setFollowingIds(userFollowing)
  }

  useEffect(()=>{
      getUser()
  },[<Feed/>])


  return (
    <div className='App'>
        <Nav />
        <main>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/register' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route element = {<ProtectRoute/>}>
                <Route path='/feed' element={<Feed/>}/>
                <Route path='/:username' element={<ProfileDetails/>}>
                  <Route path = '/:username/:label' element={<Follow/>}/>
                </Route>
            </Route>
          </Routes>
          
        </main>
    </div>
  );
}

const mapStateToProps = (state)=>{
  return {user: state.userState.user}
}
const mapActionsToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(SetUser(user)),
    setFeed: (following) => dispatch(SetFeed(following)),
    setFollowingIds: (ids) => dispatch(SetFollowingIds(ids))
  }
}  

export default connect(mapStateToProps, mapActionsToProps)(App)
