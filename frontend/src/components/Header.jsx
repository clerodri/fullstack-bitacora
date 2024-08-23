import logo from "../assets/logo_new.png";
function Header() {
  return (
    <header className=" text-white p-4" style={{ backgroundColor: "#0172B2" }}>
      <div className="container  mx-auto flex justify-between items-center">
        <div>
          <img src={logo} alt="Logo" className="h-40 w-auto rounded-full" />
          <h1 className="text-3xl font-lobster">BINNACLE</h1>
        </div>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-300">
                Cerrar Sesion
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
