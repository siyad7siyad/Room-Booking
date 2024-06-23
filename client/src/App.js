import {BrowserRouter,Routes,Route } from "react-router-dom"
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";


function App() {
  return (
    <div>
      <Provider store={store}>
       <BrowserRouter>
       <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
       </Routes>
       </BrowserRouter>
       </Provider>
    
    </div>
  );
}

export default App;
