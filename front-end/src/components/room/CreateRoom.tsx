import { useNavigate } from "react-router-dom"
import { Button } from "../common/Button"
import { Input } from "../common/Input"

const DURATION_OPTS = [
    { label: '25 min', value: 25, desc: 'Pomodoro clássico' },
    { label: '50 min', value: 50, desc: 'Sessão profunda' },
    { label: '90 min', value: 90, desc: 'Foco estendido' },
]

export const CreateRoom = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Input label="Nome:" placeholder="Digite seu Nome" />
            <Input label="Nome da Sala:" placeholder="Ex: Deep Work" />
            <div className="flex flex-col mt-3">
                <label className="text-xs mb-2 text-slate-600 pr-2">Duração padrão</label>
                <div className="grid grid-cols-3 gap-2">
                    {DURATION_OPTS.map(d => (
                        <button key={d.value} className="bg-slate-900  text-slate-600 border border-slate-800 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-150">
                            {d.label}
                        </button>
                    ))}
                </div>
            </div>
            <Button
                text="Criar sala →"
                onClick={() => navigate("room")}
            />
        </div>
    )
}