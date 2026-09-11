import { Button } from "../common/Button"
import { Input } from "../common/Input"

export const EntryRoom = () => {
    return (
        <div>
            <Input label="Nome:" placeholder="Digite seu Nome" />
            <Input label="Código:" placeholder="FSRM-XXXX" />
            <p className="text-xs text-slate-600 text-center mt-1">Solicite o código para quem criou a sala</p>
            <Button
                text="Entrar na sala →"
            />
        </div>
    )
}