import { Navigate } from "react-router-dom";
import { RiseLoader } from "react-spinners";
import { useEffect } from "react";
import useInscriptionStore from "../stores/useInscriptionStore";

export default function UserConnected({ children }) {
  const { user, loading, checkedAuth, fetchUser } = useInscriptionStore();

  useEffect(() => {
    //  ne fetch que si pas encore d’utilisateur ET pas encore vérifié
    if (!checkedAuth && !user) {
      fetchUser();
    }
  }, [checkedAuth, user, fetchUser]);

  if (!checkedAuth || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader color="#b031d7" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  return children;
}
