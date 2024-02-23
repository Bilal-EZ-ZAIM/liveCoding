
import './App.css';
import {BrowserRouter as Router , Routes , Route } from "react-router-dom";
import Homes from './pages/Homes';
import Contact from './pages/Contact';
import Abouts from './pages/Abouts';
import NavBar from './compontes/header/NavBar';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductEdit from './pages/ProductEdit';
function App() {
  return (
      <Router>
        <NavBar/>
        <Routes>
        <Route path='/' element={<Homes name="bilal"/>}/>
        <Route path='/abouts' element={<Abouts/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/edit/:id' element={<ProductEdit />} />
        </Routes>
      </Router>
  );
}

export default App;
