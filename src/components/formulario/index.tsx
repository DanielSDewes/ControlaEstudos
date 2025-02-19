import React, { useState } from 'react';
import Botao from '../Botao';
import style from './formulario.module.scss'
import { Itarefa } from '../../types/tarefa';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    setTarefas: React.Dispatch<React.SetStateAction<Itarefa[]>>
}

function Formulario({ setTarefas }: Props) {
    const [tarefa, setTarefa] = useState("");
    const [tempo, setTempo] = useState("00:00");
    const [erro, setErro] = useState("");
    
    function AdicionarTarefa(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        if (!tarefa.trim() || tempo === "00:00") {
            setErro("É necessário informar ambos os campos.");
            return;
        }

        setTarefas(tarefasAntigas => [
            ...tarefasAntigas,
            {
                tarefa,
                tempo,
                selecionado: false,
                completado: false,
                id: uuidv4()
            }
        ]);
        
        setTarefa("");
        setTempo("00:00");
        setErro("");
    }
    
    return (
        <form className={style.novaTarefa} onSubmit={AdicionarTarefa}>
            <div className={style.inputContainer}>
                <label htmlFor='tarefa'>Adicione um novo estudo</label>
                <input 
                    type="text" 
                    name="tarefa" 
                    value={tarefa} 
                    onChange={evento => setTarefa(evento.target.value)} 
                    id="tarefa" 
                    placeholder='O que você quer estudar?' 
                />
            </div>
            <div className={style.inputContainer}>
                <label htmlFor='tempo'>Tempo</label>
                <input 
                    type="time" 
                    step="1" 
                    name='tempo' 
                    value={tempo} 
                    onChange={evento => setTempo(evento.target.value)}  
                    id='tempo' 
                    min='00:00:00' 
                    max='01:30:00' 
                />
            </div>
            {erro && <p className={style.erro}>{erro}</p>}
            <Botao type="submit">Adicionar</Botao>
        </form>
    );
}

export default Formulario;