import { SquarePen, Trash, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNote, updateNote } from "../store/slices/notesSlice";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const CardNote = ({ title, description, date, id, priority = "low", isCompleted = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const priorityColors = {
    low: "bg-green-600 text-white",
    medium: "bg-yellow-600 text-white",
    high: "bg-red-600 text-white",
  };

  const handleDelete = () => {
    dispatch(deleteNote(id))
      .unwrap()
      .then(() => {
        toast.success("¡Nota eliminada con éxito!", {
          theme: "colored",
        });
        setShowConfirmModal(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error al eliminar la nota");
      });
  };

  const toggleComplete = () => {
    dispatch(updateNote({ id, note: { isCompleted: !isCompleted } }));
  };

  return (
    <>
      <div className={`card bg-base-300 w-full shadow-xl transition-transform hover:scale-[1.02] ${isCompleted ? 'opacity-70' : ''}`}>
        <div className="card-body p-6">
          <div className="flex justify-between items-start mb-2">
            <span className={`badge ${priorityColors[priority]} uppercase text-xs font-bold`}>
              {priority}
            </span>
            <button onClick={toggleComplete} className="btn btn-circle btn-xs btn-ghost" title={isCompleted ? "Marcar como pendiente" : "Marcar como completada"}>
              <CheckCircle className={isCompleted ? "text-green-500" : "text-gray-500"} size={20} />
            </button>
          </div>

          <h2 className={`card-title text-accent font-bold lg:text-2xl ${isCompleted ? 'line-through text-gray-500' : ''}`}>
            {title}
          </h2>
          <p className={`text-amber-50 ${isCompleted ? 'line-through text-gray-500' : ''}`}>{description}</p>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
            <time className="text-sm opacity-70" dateTime={date}>{date}</time>
            <div className="flex gap-3">
              <button
                className="btn btn-square btn-sm btn-ghost hover:text-blue-400 transition-colors"
                onClick={() => navigate(`/editNote/${id}`)}
              >
                <SquarePen size={20} />
              </button>
              <button
                className="btn btn-square btn-sm btn-ghost hover:text-red-400 transition-colors"
                onClick={() => setShowConfirmModal(true)}
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <DeleteConfirmationModal
          title={title}
          deleteNote={handleDelete}
          setShowConfirmModal={setShowConfirmModal}
        />
      )}
    </>
  );
};

export default CardNote;