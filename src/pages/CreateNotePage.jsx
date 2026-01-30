import NoteForm from "../components/NoteForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNote } from "../store/slices/notesSlice";

const CreateNotePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreate = async (note) => {
    try {
      await dispatch(addNote(note)).unwrap();

      toast.success("Nota creada con éxito", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la nota");
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold mb-8">Crear Nueva Nota</h1>
      <NoteForm
        onSubmit={handleCreate}
        initialDate={{ title: "", description: "" }}
      />
    </div>
  );
};

export default CreateNotePage;