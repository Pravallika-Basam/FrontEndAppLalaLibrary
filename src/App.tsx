import './App.css';
import { NavBar } from './Layouts/Navbar';
import { Footer } from './Layouts/Footer';
import { HomePage } from './Layouts/HomePage/HomePage';

export const App =() =>{
  return (
    <div className="App">
      <NavBar />
      <HomePage />
      <Footer />
    </div>
  );
}
