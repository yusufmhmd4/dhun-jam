import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"
import NotFound from "./components/NotFound"

import "./App.css"

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Dashboard />}/>
          <Route exact path="/not-found" element={<NotFound/>}/>
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
