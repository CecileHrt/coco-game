import React from "react";
import { Outlet } from "react-router-dom";
import AdaptativeMode from "./AdaptativeMode";

function App() {
  return (
    <>
      <AdaptativeMode>
        <Outlet />
        {/* <CocoConcept />; */}
      </AdaptativeMode>
    </>
  );
}

export default App;
