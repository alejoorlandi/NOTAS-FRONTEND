import { useState, useEffect } from "react";

const NoteForm = ({ onSubmit, initialDate }) => {
  const [note, setNotes] = useState({
    title: "",
    description: "",
    priority: "low",
    ...initialDate
  });

  // Actualizar el estado si cambian los datos iniciales
  useEffect(() => {
    if (initialDate) {
      setNotes((prev) => ({ ...prev, ...initialDate }));
    }
  }, [initialDate]);

  const handleChange = (e) => {
    setNotes({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(note);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base-300 rounded-lg max-w-4xl mx-auto p-10 shadow-lg"
    >
      <div className="form-control w-full mb-4">
        <label className="label">
          <span className="label-text">Título</span>
        </label>
        <input
          className="input input-bordered w-full focus:outline-none focus:border-accent"
          type="text"
          placeholder="Escribe un título..."
          name="title"
          value={note.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-control w-full mb-4">
        <label className="label">
          <span className="label-text">Prioridad</span>
        </label>
        <select
          className="select select-bordered w-full focus:outline-none focus:border-accent"
          name="priority"
          value={note.priority}
          onChange={handleChange}
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <div className="form-control w-full mb-8">
        <label className="label">
          <span className="label-text">Descripción</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-32 w-full resize-y focus:outline-none focus:border-accent"
          placeholder="Detalles de la nota..."
          name="description"
          value={note.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <button className="btn btn-primary w-full shadow-md hover:brightness-110 transiton-all">
        Guardar Nota
      </button>
    </form>
  );
};

export default NoteForm;