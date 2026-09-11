import { useNavigate } from "react-router-dom"
import { Input } from "../../common/input/Input";
import { Button } from "../../common/button/Button";

export const EntryRoom = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Input label="Nome:" placeholder="Digite seu Nome" />
            <Input label="Código:" placeholder="FSRM-XXXX" />
            <p className="text-xs text-slate-600 text-center mt-1">Solicite o código para quem criou a sala</p>
            <Button
                text="Entrar na sala →"
                onClick={() => navigate("room")}
            />
        </div>
    )
}