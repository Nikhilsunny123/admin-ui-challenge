import SideBar from "./components/SideBar";
import Topbar from "./components/Topbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import CustomersTable from "./pages/CustomerTable";

function App() {
  return (
    <div className="app">
      <SideBar />

      <main className="content">
        <Topbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/customerstable" element={<CustomersTable />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
