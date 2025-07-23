import React from "react";
import { Outlet } from "react-router-dom";
import AdaptativeMode from "./AdaptativeMode";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AdaptativeMode>
        <Toaster position="top-right" reverseOrder={false} />
        <Outlet />
        {/* <CocoConcept />; */}
      </AdaptativeMode>
    </>
  );
}

export default App;
