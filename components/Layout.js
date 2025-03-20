import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>{" "}
      {/* This ensures the homepage content is rendered */}
      <Footer />
    </div>
  );
}
