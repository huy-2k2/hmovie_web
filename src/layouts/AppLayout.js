import React from "react";
import ButtonScrollTop from "../components/ButtonScrollTop";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
export default function AppLayout({ children }) {
  return (
    <div>
      <ButtonScrollTop></ButtonScrollTop>
      <Header></Header>
      <div className="pb-10 bg-black">{children}</div>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
}
