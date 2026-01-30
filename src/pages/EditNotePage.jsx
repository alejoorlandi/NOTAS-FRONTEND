import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoteForm from "../components/NoteForm";
import { updateNote, fetchNotes } from "../store/slices/notesSlice";

const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { notes, status } = useSelector(state => state.notes);
  const foundNote = notes.find(n => n._id === id);

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (foundNote) {
      setInitialData({
        title: foundNote.title,
        description: foundNote.description,
        priority: foundNote.priority || 'low'
      });
    } else {
      if (status === 'idle') {
        dispatch(fetchNotes());
      }
    }
  }, [id, foundNote, status, dispatch]);

  const handleUpdate = async (noteData) => {
    try {
      await dispatch(updateNote({ id, note: noteData })).unwrap();
      toast.success("¡Nota actualizada con éxito!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
      navigate("/");
    } catch (err) {
      toast.error("Error al actualizar la nota", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  if (!initialData && status === 'succeeded' && !foundNote) {
    return <div className="text-center mt-10">Nota no encontrada</div>
  }

  if (!initialData) return <div className="text-center mt-10">Cargando...</div>

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-8">Editar Nota</h1>
      <NoteForm initialDate={initialData} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditNotePage;