import {BrowserRouter as  Router,Routes,Route} from 'react-router-dom';
import Home from './Home';
import Details from './details';
import './App.css'

function App(e) {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
