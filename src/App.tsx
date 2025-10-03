import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ingredients from "./pages/Ingredients";
import Recipes from "./pages/Recipes";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </Layout>
  );
}
