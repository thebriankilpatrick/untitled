import React from "react";
import Landing from "./pages/Landing";
// import MainPage from "./pages/MainPage";
import "./App.css";


// MainPage will be imported from Landing
// And Landing will be rendered here.

// Should I handle the conditional rendering here, for logged in or not??
function App() {
  return (
    <div>
      <Landing ></Landing>
    </div>
  );
}


export default App;
