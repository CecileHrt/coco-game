import { Navigate } from "react-router-dom";
import useInscriptionStore from "../stores/useInscriptionStore";

export default function UserConnected({ children }) {
  const user = useInscriptionStore((state) => state.user);

  if (!user) return <Navigate to="/connexion" replace />;
  return children;
}
