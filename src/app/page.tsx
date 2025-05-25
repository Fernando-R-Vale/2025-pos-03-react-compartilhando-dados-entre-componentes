"use client";

import type React from "react";
import { useState, useEffect } from "react";
import initialDados, { TarefaInterface } from "@/data"; 
import Cabecalho from "@/componentes/Cabecalho"; 
import ModalTarefa from "@/componentes/ModalTarefa";

interface TarefaProps {
	titulo: string;
	concluido?: boolean;
}

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido }) => {
	const [estaConcluido, setEstaConcluido] = useState(concluido);

	const classeCard = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border transition-all duration-150 ${
		estaConcluido
			? "bg-gray-700 hover:border-gray-600"
			: "bg-gray-100 hover:border-gray-300" 
	}`;

	const classeCorDoTexto = estaConcluido ? "text-gray-50" : "text-gray-800";

	const escutarClique = () => {
		console.log(`A tarefa '${titulo}' foi clicada!`);
		setEstaConcluido(!estaConcluido);
	};

	return (
		<div className={classeCard} onClick={escutarClique} role="button" tabIndex={0} 
             onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') escutarClique(); }}
             aria-pressed={estaConcluido}
             aria-label={`Tarefa: ${titulo}, Estado: ${estaConcluido ? "Concluída" : "Pendente"}`}
        >
			<h3 className={`text-xl font-bold ${classeCorDoTexto}`}>{titulo}</h3>
			<p className={`text-sm ${classeCorDoTexto}`}>
				{estaConcluido ? "Concluída" : "Pendente"}
			</p>
		</div>
	);
};

interface TarefasProps {
	dados: TarefaInterface[];
}

const Tarefas: React.FC<TarefasProps> = ({ dados }) => {
	if (!dados || dados.length === 0) {
        return <p className="text-center text-gray-500 mt-8">Nenhuma tarefa cadastrada ainda.</p>;
    }
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{dados.map((tarefa) => (
				<Tarefa
					key={tarefa.id}
					titulo={tarefa.title}
					concluido={tarefa.completed}
				/>
			))}
		</div>
	);
};

const Home = () => {
	const [tarefas, setTarefas] = useState<TarefaInterface[]>(initialDados);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleAddTask = (title: string) => {
		if (title.trim() === "") {
            console.warn("Tentativa de adicionar tarefa sem título.");
            return;
        }
		const novaTarefa: TarefaInterface = {
			id: Date.now(), 
			title: title,
			completed: false,
		};
		setTarefas((prevTarefas) => [...prevTarefas, novaTarefa]);
		setIsModalOpen(false); // Fecha o modal após adicionar a tarefa
        console.log(`Tarefa adicionada: ${title}`);
	};

	return (
		<div className="container mx-auto p-4 min-h-screen bg-gray-50">
			<Cabecalho />
			
			{}
			<div className="my-8 text-center">
				<button
					onClick={handleOpenModal}
					className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    aria-haspopup="true"
                    aria-expanded={isModalOpen}
				>
					Adicionar Nova Tarefa
				</button>
			</div>

			{}
			<Tarefas dados={tarefas} />

			{}
			<ModalTarefa
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onAddTask={handleAddTask}
			/>
		</div>
	);
};

export default Home;
