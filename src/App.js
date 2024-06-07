import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import SchedulingPage from "./components/SchedulingPage/SchedulingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scheduling" element={<SchedulingPage />} />
      </Routes>
    </>
  );
}

export default App;
