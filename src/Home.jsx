import React from "react";
import { signOut } from "firebase/auth";
import { database } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";
import ImageGallery from "./ImageGallery";

function Home() {
  const history = useNavigate();
  const handleClick = () => {
    signOut(database).then((val) => {
      history("/");
    });
  };
  return (
    <div className="Home">
      <section className="section-header center">
        <h1 className="header-primary">My Gallery</h1>
        <button onClick={handleClick} className="sign-out-btn">
          Sign out
        </button>
      </section>

      <div>
        <ImageGallery />
      </div>
    </div>
  );
}

export default Home;
