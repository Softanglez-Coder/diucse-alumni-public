import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Link {
  name: string;
  href: string;
}

export const PrimaryNav = () => {
  const [links, setLinks] = useState<Array<Link>>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch("/data/primary-links.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Array<Link> = await response.json();

        setLinks(data);
      } catch (error) {
        console.error("Failed to fetch links:", error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="shadow-md bg-white px-4 md:px-0">
      <div className="flex items-center justify-between container mx-auto h-28">
        <div>
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="h-28 w-auto mx-auto"
          />
        </div>

        <div className="h-full">
          <ul className="flex h-full">
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
