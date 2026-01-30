import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const UserInfoPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Perfil de Usuario</h1>
      <div className="mb-6">
        <p className="text-lg">
          <span className="font-semibold">ID:</span> {user.id}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Usuario:</span> {user.username}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserInfoPage;