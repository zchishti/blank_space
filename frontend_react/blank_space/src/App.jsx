import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Container from './components/Container';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import './App.css';
import { UserContext } from './context';

function App() {
  const userName = "Zain"
  return (
    <UserContext.Provider value={userName}>
    <Router>
    <div className="App">
      <div className="container-fluid">
        <Header/>
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path="/dashboard" element={<DashboardScreen/>} />
              <Route path="/" element={<HomeScreen/>} />
            </Routes>
          </Container>
        </main>
      </div>
    </div>
    </Router>
    </UserContext.Provider>
  )
}

export default App
