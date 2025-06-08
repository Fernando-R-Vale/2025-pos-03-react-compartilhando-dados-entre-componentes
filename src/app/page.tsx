"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import Cabecalho from "@/componentes/Cabecalho";
import Tarefa from "@/componentes/Tarefa";
import ModalTarefa from "@/componentes/ModalTarefa";
import initialDados, { TarefaInterface } from "@/data";

const Home = () => {
  const [tarefas, setTarefas] = useState<TarefaInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("tarefas");
      if (savedTasks) {
        setTarefas(JSON.parse(savedTasks));
      } else {
        setTarefas(initialDados);
      }
    } catch (error) {
      console.error("Falha ao carregar tarefas do localStorage", error);
      setTarefas(initialDados);
    }
  }, []);


  useEffect(() => {
    if (tarefas.length > 0) { 
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  }, [tarefas]);

  const handleToggleStatus = (id: number) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, completed: !tarefa.completed } : tarefa
      )
    );
  };

  const handleAddTask = (title: string) => {
    const novoId = tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1;
    const novaTarefa: TarefaInterface = {
      id: novoId,
      title,
      completed: false,
    };
    setTarefas((prevTarefas) => [...prevTarefas, novaTarefa]);
    toast.success('Tarefa adicionada com sucesso!');
  };

  
  const tarefasOrdenadas = [...tarefas].sort((a, b) => 
    a.completed === b.completed ? 0 : a.completed ? 1 : -1
  );

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50">
      {}
      <Toaster position="bottom-right" />

      <Cabecalho />
      
      <div className="my-8 text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center mx-auto gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-haspopup="true"
          aria-expanded={isModalOpen}
        >
          <PlusCircleIcon className="h-6 w-6" />
          Adicionar Nova Tarefa
        </button>
      </div>
      
      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {tarefasOrdenadas.map((tarefa) => (
            <motion.div
              key={tarefa.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            >
              <Tarefa dados={tarefa} onToggleStatus={handleToggleStatus} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {tarefasOrdenadas.length === 0 && (
        <p className="text-center text-gray-500 mt-10">Nenhuma tarefa encontrada. Que tal adicionar uma?</p>
      )}

      <ModalTarefa
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default Home;