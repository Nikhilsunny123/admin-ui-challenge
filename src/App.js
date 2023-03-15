import SideBar from "./components/SideBar";
import Topbar from "./components/Topbar";
import { Routes, Route } from "react-router-dom";

import { Dashboard } from "@mui/icons-material";
import Members from "./pages/Members";

function App() {
  return (
    <div className="app">
      <SideBar />

      <main className="content">
        <Topbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
