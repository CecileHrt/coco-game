import { Navigate } from "react-router-dom";
import { RiseLoader } from "react-spinners";
import { useEffect } from "react";
import useInscriptionStore from "../stores/useInscriptionStore";

export default function UserConnected({ children }) {
  const { user, loading, checkedAuth, fetchUser } = useInscriptionStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading && !checkedAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader color="#b031d7" />
      </div>
    );
  }

  if (checkedAuth && !user) {
    return <Navigate to="/connexion" replace />;
  }

  return children;
}
