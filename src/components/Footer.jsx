import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>ⓒ {year} Note Keeper by b34nb0</p>
    </footer>
  );
}

export default Footer;
