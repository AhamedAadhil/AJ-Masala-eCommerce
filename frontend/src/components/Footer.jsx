const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white mt-5 p-4 flex justify-center items-center">
      <aside>
        <p className="text-center">
          © {new Date().getFullYear()} AJ Masala. All rights reserved. Designed
          and developed by <a href="#">A2Labz.</a>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
