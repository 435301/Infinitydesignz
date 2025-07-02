// src/components/BackToTopButton.jsx
import { useEffect, useState } from "react";
import "../../src/css/user/userstyle.css";

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    showButton && (
      <a
        href="#"
        className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"
        onClick={scrollToTop}
      >
        <i className="bi bi-arrow-up"></i>
      </a>
    )
  );
};

export default BackToTopButton;
