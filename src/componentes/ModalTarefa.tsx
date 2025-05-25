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

  const handleSubmit = () => {
    if (tituloNovaTarefa.trim()) {
      onAddTask(tituloNovaTarefa.trim());
      setTituloNovaTarefa(""); // Limpa o input após adicionar
      // onClose(); // A função onAddTask já chama onClose no componente Home
    } else {
      // Poderia adicionar um feedback para o usuário aqui se o título estiver vazio
      console.warn("O título da tarefa não pode estar vazio.");
    }
  };

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) {
    return null;
  }

  return (
    // Overlay do modal
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      {/* Container do modal */}
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Adicionar Nova Tarefa</h2>
        <input
          type="text"
          value={tituloNovaTarefa}
          onChange={(e) => setTituloNovaTarefa(e.target.value)}
          placeholder="Digite o título da tarefa..."
          className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          aria-label="Título da nova tarefa"
        />
        {/* Botões de ação */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-150 font-medium"
            aria-label="Cancelar e fechar modal"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-150 font-medium"
            aria-label="Adicionar nova tarefa"
          >
            Adicionar Tarefa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTarefa;
