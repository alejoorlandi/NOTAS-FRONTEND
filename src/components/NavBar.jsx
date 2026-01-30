import { NavLink, Link } from "react-router-dom";
import { PlusIcon, User } from "lucide-react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="navbar bg-base-300 py-4 mb-10 shadow-sm">
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between px-4">
        <NavLink className="text-3xl font-bold text-base-content" to="/">
          TodoApp
        </NavLink>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <NavLink
                className="btn btn-sm btn-primary font-bold"
                to="/createNote"
              >
                <PlusIcon size={18} />
                Crear Nota
              </NavLink>
              <Link to="/user" className="btn btn-sm btn-ghost btn-circle avatar" title="Perfil">
                <div className="w-10 rounded-full flex items-center justify-center bg-base-200">
                  <User />
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;