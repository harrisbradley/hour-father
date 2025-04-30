import { useAuth } from "./AuthContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Hour Father 🙏</h1>

      {!user && (
        <>
          <SignUp />
          <Login />
        </>
      )}

      {user && (
        <>
          <p>Welcome back, {user.email}!</p>
        </>
      )}
    </div>
  );
}

export default App;
