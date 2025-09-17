import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { useState, type FormEvent } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import {auth} from '../../services/firebaseConection'
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login(){
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function handleLogin(e: FormEvent){
      e.preventDefault()
      if(email === '' || senha === ''){
        toast('preencha todos os campos')
        return;
      }
      signInWithEmailAndPassword(auth, email, senha)
      .then((response)=>{
        console.log(response)
        navigate('/admin')
      }).catch((error)=>{
         console.log(error)
         toast('email ou senha incorretos!')
      })
     
    }

    return(
        <div>
        <Link to='/'>
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl text-center" >Link
            <span className="bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent">aí</span></h1>
        </Link>
            
          <form className="w-full max-w-xl flex flex-col px-2" onSubmit={handleLogin}>
              <Input
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              <Input
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              />

              <button 
              type="submit"
              className="h-9 bg-purple-600 rounded border-0 text-lg font-medium text-white cursor-pointer">acessar</button>
          </form>
        </div>
    )
}