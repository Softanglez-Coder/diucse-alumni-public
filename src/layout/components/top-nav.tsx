import { Link } from "react-router-dom";

export const TopNav = () => {
  return (
    <div className="bg-primary p-4">
      <div className="flex items-center justify-between container mx-auto text-white text-sm">
        <div>
          <ul>
            <li></li>
          </ul>
        </div>

        <div>
          <ul>
            <li>
              <Link to="/portal">Membership Portal</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
