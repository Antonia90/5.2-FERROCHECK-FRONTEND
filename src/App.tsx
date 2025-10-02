import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
export default function App() {


  return (
    <>
      <div className="min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

