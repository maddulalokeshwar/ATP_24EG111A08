import './App.css';
import User from '../components/User.jsx'
import NavBar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx';
import UsersList from '../components/UserList.jsx';
import Counter from '../components/Counter.jsx';

function App(){
    //state
    
    //return react element
    return(
        <div>
            <NavBar />
            <div className='m-16 min-h-screen'>
                {/* <Counter /> */}
                <UsersList />
            </div>
            <Footer className=""/>
        </div>
    )
}

export default App;