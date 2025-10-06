import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ingredients from "./pages/Ingredients";
import Recipes from "./pages/Recipes";
import DailyCheck
 from "./pages/DailyCheck";
 import Advices from "./pages/Advices";
 import Profile from "./pages/Profile";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/daily-check" element={<DailyCheck />} />
        <Route path="/advices" element={<Advices />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}
