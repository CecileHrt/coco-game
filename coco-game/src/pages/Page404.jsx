import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-[160deg] p-2 from-[#FFD8FA] via-[#C3A3FF] to-[#8964C2] text-[#1f1b24] p-6 text-center ">
      <h1 className="text-7xl font-bold text-[#b031d7] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Oups ! Page introuvable.</h2>
      <p className="text-lg max-w-lg mb-8">
        Cette page est toujours en couvaison, mais d’autres pages t’attendent !{" "}
      </p>
      <Link
        to="/"
        className="btn-jaune px-6 py-3 rounded-lg shadow-md hover:opacity-90 text-[#1f1b24] font-bold text-base transition duration-300"
      >
        Revenir à l’accueil
      </Link>
    </div>
  );
};

export default Page404;
