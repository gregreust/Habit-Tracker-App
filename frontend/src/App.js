// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HowTo from "./pages/HowTo/HowTo";
import CheckIn1 from "./pages/CheckIn/CheckIn1";
import MyProgress from "./pages/MyProgress/MyProgress";
import CommunitySupport from "./pages/CommunitySupport/CommunitySupport";
import MyGoals from "./pages/MyGoals/MyGoals";
import MyGoals2 from "./pages/MyGoals/MyGoals2";
import Settings from "./pages/Settings/Settings";


// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/howto" element={<HowTo/>}></Route>
        <Route path="/checkin" element={<CheckIn1/>}></Route>
        <Route path="/myprogress" element={<MyProgress/>}></Route>
        <Route path="/community" element={<CommunitySupport/>}></Route>
        <Route path="/mygoals" element={<MyGoals/>}></Route>
        <Route path="/goals2" element={<MyGoals2/>}></Route>
        <Route path="/settings" element={<Settings/>}></Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
