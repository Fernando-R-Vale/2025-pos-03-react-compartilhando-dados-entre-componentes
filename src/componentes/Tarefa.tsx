"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { TarefaInterface } from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

interface TarefaProps {
  dados: TarefaInterface;
  onToggleStatus: (id: number) => void;
}

const Tarefa: React.FC<TarefaProps> = ({ dados, onToggleStatus }) => {
  const { id, title, completed } = dados;

  const classeCard = `p-4 mb-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer flex items-start space-x-4 ${
    completed
      ? "bg-gray-800 text-gray-200 hover:border-gray-600"
      : "bg-white text-gray-800 hover:border-gray-300"
  }`;

  return (
    <div
      className={classeCard}
      onClick={() => onToggleStatus(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onToggleStatus(id);
      }}
      aria-pressed={completed}
      aria-label={`Tarefa: ${title}, Estado: ${completed ? "Concluída" : "Pendente"}`}
    >
      {/* Ícone */}
      <div className="flex-shrink-0">
        {completed ? (
          <CheckCircleIcon className="h-6 w-6 text-green-400" />
        ) : (
          <ClockIcon className="h-6 w-6 text-yellow-500" />
        )}
      </div>

      {}
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className={`text-sm mt-1 ${completed ? 'text-gray-400' : 'text-gray-600'}`}>
          {completed ? "Concluída" : "Pendente"}
        </p>
      </div>
    </div>
  );
};

export default Tarefa;