import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Change URL if needed based on environment
            const response = await axios.post(`${API_URL}/auth/login`, formData);
            dispatch(setCredentials(response.data));
            toast.success("Login exitoso");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.error || "Error al iniciar sesión");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-center text-gray-900">Iniciar Sesión</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Usuario</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Ingresar
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
