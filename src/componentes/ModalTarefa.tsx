"use client";

import type React from "react";
import { useState } from "react";

interface ModalTarefaProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (taskTitle: string) => void;
}

const ModalTarefa: React.FC<ModalTarefaProps> = ({ isOpen, onClose, onAddTask }) => {
  const [tituloNovaTarefa, setTituloNovaTarefa] = useState("");
  const [error, setError] = useState(""); 

  const handleSubmit = () => {
    if (tituloNovaTarefa.trim()) {
      onAddTask(tituloNovaTarefa.trim());
      setTituloNovaTarefa(""); 
      setError(""); 
      onClose(); 
    } else {
      setError("O título da tarefa é obrigatório."); 
    }
  };

  const handleClose = () => {
    setTituloNovaTarefa(""); 
    setError(""); 
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Adicionar Nova Tarefa</h2>
        <input
          type="text"
          value={tituloNovaTarefa}
          onChange={(e) => setTituloNovaTarefa(e.target.value)}
          placeholder="Digite o título da tarefa..."
          className={`w-full p-3 border rounded-md mb-2 focus:outline-none focus:ring-2 text-gray-700 ${
            error ? "border-red-500 ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
          aria-label="Título da nova tarefa"
        />
        {}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Adicionar Tarefa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTarefa;