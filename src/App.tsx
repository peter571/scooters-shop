import { useState } from "react";
import {
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import HomeScreen from "./pages/Home";
import RidesScreen from "./pages/Rides";
import CheckoutScreen from './pages/Checkout'


function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/rides' element={<RidesScreen />} />
      <Route path='/checkout' element={<CheckoutScreen />} />
    </Routes>
  );
}

export default App;
