import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { database } from "./FirebaseConfig";
import "./App.css";

function App() {
  // Initialize the user state and set it to null initially.
  const [user, setUser] = useState(null);

  // Effect to listen for changes in the user's authentication state.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(database, (authUser) => {
      // If authUser is not null, the user is signed in; otherwise, they are signed out.
      setUser(authUser);
    });

    // Clean up the subscription when the component unmounts.
    return () => unsubscribe();
  }, []);

  // Function to handle user logout.
  const handleLogout = () => {
    signOut(database);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home onLogout={handleLogout} /> : <Login />}
        />
        <Route
          path="/home"
          element={user ? <Home onLogout={handleLogout} /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
