import { Link } from "react-router-dom";

export function NotFound(){
    return(
        <div className="flex flex-col text-center justify-center gap-3 text-white">
            <h2 className="text-6xl bg-gradient-to-r from-purple-700 to-purple-400 bg-clip-text text-transparent font-medium">404</h2>
            <strong className="font-medium text-2xl">Essa página não existe</strong>
            <Link to='/' className="text-blue-400 underline">Voltar para home</Link>
        </div>
    )
}