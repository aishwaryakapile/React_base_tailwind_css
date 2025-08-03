import logo from "./logo.svg";
import "./App.css";
import UserList from "./compoenent/User/UserList";
import { Route, Routes } from "react-router-dom";
import EditUser from "./compoenent/User/EditUser";

function App() {
  return (
    <div className="App">
      {/* <UserList/> */}
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/editUsers/:id" element={<EditUser />} />
        <Route path="/addUser" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
