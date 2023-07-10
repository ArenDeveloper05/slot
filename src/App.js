import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ROUTER } from "./router/router";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTER.HOME_ROUTE} element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
