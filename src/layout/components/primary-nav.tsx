import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface NavLink {
  name: string;
  href: string;
}

export const PrimaryNav = () => {
  const [links, setLinks] = useState<Array<NavLink>>([]);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch("/data/primary-links.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Array<NavLink> = await response.json();

        setLinks(data);
      } catch (error) {
        console.error("Failed to fetch links:", error);
      }
    };

    fetchLinks();
  }, []);

  const openMenu = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <div className="shadow-md bg-white px-4 md:px-0">
      <div className="flex items-center justify-between container mx-auto h-20">
        <Link to="/">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="h-20 w-auto mx-auto"
          />
        </Link>

        <div className="h-full">
          {/* menus for smaller screen */}
          <button className="md:hidden h-full flex items-center justify-center p-4" type="button" onClick={openMenu}>
            <i className="text-3xl fa-solid fa-bars"></i>
          </button>

          {menuOpened && <div className="md:hidden h-screen fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
            <button className="absolute top-4 right-4 text-3xl" onClick={() => setMenuOpened(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            <ul className="flex flex-col items-center justify-center bg-white shadow-md h-full">
              {links.map((link, index) => (
                <li key={index} className="w-full">
                  <Link
                    to={link.href}
                    className="text-gray-700 hover:text-primary px-4 py-2 hover:bg-gray-100 w-full text-center block"
                    onClick={() => setMenuOpened(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            </div>
          }

          {/* menus for large screen */}
          <ul className="hidden md:flex h-full">
            {links.map((link, index) => (
              <li key={index} className="h-full">
                <Link
                  to={link.href}
                  className="text-gray-700 hover:text-primary px-4 hover:bg-gray-100 h-full text-center flex items-center justify-center"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
