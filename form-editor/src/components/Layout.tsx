import { Outlet, Link } from "react-router-dom";
import { ClipboardEditIcon } from "lucide-react";

const Layout = () => {
  return (
    <>
      <nav className="mx-5 mt-2">
        <ul className="flex gap-2 justify-between">
          <li>
            <Link to="/">
              <div className="p-2 rounded-full bg-blue-400 ">
                <ClipboardEditIcon color="white" strokeWidth={1} size="24" />
              </div>
            </Link>
          </li>
          
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
