import React from 'react';
import Notes from './Notes';
import { useEffect  , useState} from 'react';
import Spinner from './Spinner.js';
import Login from './Login.js';

const Home = (props) => {
  const [isLogin, setisLogin] = useState(false);
  const [loggedInstate,setLoggedInTrue]=useState(false)
  useEffect(() => {
    if (localStorage.getItem('userName')) {
      setisLogin(true);
    }
  }, [loggedInstate,isLogin])
  const handlesetLoggedInTrue=(value)=>{
    setLoggedInTrue(true)
  }
  return (
    <div>
      {/* <Spinner/> */}
      {!isLogin && <Login handlesetLoggedInTrue={handlesetLoggedInTrue}></Login>}
      <div className='container'>{isLogin && <Notes showAlert={props.showAlert}></Notes>}</div> 
    </div>
  )
}
export default Home;