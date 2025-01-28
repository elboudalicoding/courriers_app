import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <div>Welcome to Dashboard</div>;
}

export default Dashboard;
