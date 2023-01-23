import React, { useEffect, useState } from "react";

export default function ButtonScrollTop() {
  const [display, setDisplay] = useState(window.scrollY > 0);
  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    function handleScroll() {
      setDisplay(window.scrollY > 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      onClick={handleClick}
      className={`${
        display ? "block" : "hidden"
      } fixed right-0 z-50 flex items-center justify-center w-10 h-10 text-3xl text-white -translate-y-1/2 rounded-full cursor-pointer top-1/2 bg-primary`}
    >
      <i class="fa-solid fa-angles-up"></i>
    </div>
  );
}
