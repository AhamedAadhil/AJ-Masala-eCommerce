import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white mt-5 p-4 flex justify-center items-center">
      <aside>
        <p className="text-center">
          Copyright © {new Date().getFullYear()} - All rights reserved by <a href='#'>A2Labz</a>
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
