import { useEffect } from "react";
// import WOW from "wowjs";
// import WOW from "wowjs/dist/wow";

export const useMainScripts = () => {
    useEffect(() => {
        // Spinner
        const spinner = () => {
            setTimeout(() => {
                const spinnerElement = document.getElementById("spinner");
                if (spinnerElement) {
                    spinnerElement.classList.remove("show");
                }
            }, 1);
        };
        spinner();

        // WOW Init
        // new WOW().init();


        // Scroll events
        const onScroll = () => {
            const backToTop = document.querySelector(".back-to-top");
            const stickyTop = document.querySelector(".sticky-top");

            if (window.scrollY > 300) {
                if (stickyTop) {
                    stickyTop.classList.add("shadow-sm");
                    stickyTop.style.top = "0px";
                }
                if (backToTop) backToTop.style.display = "block";
            } else {
                if (stickyTop) {
                    stickyTop.classList.remove("shadow-sm");
                    stickyTop.style.top = "-100px";
                }
                if (backToTop) backToTop.style.display = "none";
            }
        };

        window.addEventListener("scroll", onScroll);

        // Back to Top
        const backToTop = document.querySelector(".back-to-top");
        if (backToTop) {
            backToTop.addEventListener("click", (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }

        // Cleanup
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);
};
