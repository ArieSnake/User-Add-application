import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import { Users } from "./features/users/users";
import { AddUser } from "./features/users/addUser";

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path="/add" element={<AddUser />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
