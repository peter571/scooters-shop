import { useState } from "react";
import {
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import HomeScreen from "./pages/Home";
import RidesScreen from "./pages/Rides";
import CheckoutScreen from './pages/Checkout'
import Nav from "./components/Nav/Nav";
import Success from "./pages/Success";


function App() {
  return (
    <>
    <Nav />
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/rides' element={<RidesScreen />} />
      <Route path='/checkout' element={<CheckoutScreen />} />
      <Route path='/success' element={<Success />} />
    </Routes>
    </>
  );
}

export default App;
