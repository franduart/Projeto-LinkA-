import { useEffect, useState, type FormEvent } from "react"
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { db } from "../../services/firebaseConection"
import {doc, setDoc, getDoc} from 'firebase/firestore'
import { toast } from "react-toastify"

export function Networks(){
     const [facebook, setFacebook] = useState('')
     const [instagram, setInstagram] = useState('')
     const [github, setGitHub] = useState('')

     useEffect(()=>{
        function loadLinks(){
            const docRef = doc(db, 'social', 'link')
            getDoc(docRef)
            .then((snapshot)=>{
              if(snapshot.data() !== undefined){
                setFacebook(snapshot.data()?.facebook)
                setInstagram(snapshot.data()?.instagram)
                setGitHub(snapshot.data()?.github)
              }
            })
        }
        loadLinks()
     },[])
     function handleRegister(e: FormEvent){
        e.preventDefault();

        setDoc(doc(db, 'social', 'link'),{
            portfolio: facebook,
            linkdin: instagram,
            github: github
        }).then(()=>{
           console.log('cadastrado com sucesso')
           toast('cadastrado com sucesso')
        }).catch((error)=>{
            console.log(error)
            toast('Erro ao cadastrar', error)
        })
       
     }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>
            <h1 className="text-white text-2xl font-medium mt-8 md-4">pagina redes sociais</h1>
            
            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Link do Portfolio</label>
                <Input
                type="url"
                placeholder="Digite a url do portfolio"
                value={facebook}
                onChange={(e)=> setFacebook(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do Linkdin</label>
                <Input
                type="url"
                placeholder="Digite a url do linkdin"
                value={instagram}
                onChange={(e)=> setInstagram(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do GitHub</label>
                <Input
                type="url"
                placeholder="Digite a url do GitHub"
                value={github}
                onChange={(e)=> setGitHub(e.target.value)}
                />

                <button 
                type="submit"
                className="text-white bg-purple-800 h-9 rounded-md items-center justify-center flex mb-7 font-medium cursor-pointer"
                >Cadastrar</button>
            </form>
            </div>
    )
}