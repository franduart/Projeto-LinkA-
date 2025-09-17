import { useState, useEffect, type FormEvent } from "react"
import { db } from "../../services/firebaseConection"
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from 'firebase/firestore'
import { toast } from "react-toastify"
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import {FiTrash} from 'react-icons/fi'

interface LinkProps{
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}

export function Admin(){

    const [nameInput, setNameInput] = useState('')
    const [url, setUrl] = useState('')
    const [textColorInput, setTextColorInput] = useState("#f1f1f1")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")
    const [links, setLinks] = useState<LinkProps[]>([])
    function handleRegister(e: FormEvent){
        e.preventDefault();
        if(nameInput === ''|| url ===''){
           toast('Preecha todos os campos!' )
           return;
        }
         addDoc(collection(db, 'links'), {
            name: nameInput,
            url: url,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date()
        })
        .then(()=>{
          setNameInput('')
          setUrl('')
          toast('cadastrado com sucesso')
        }).catch((error)=>{
           toast('Erro ao cadastrar links', error)
        })

    }

   async function deleteTarefa(id: string){
       const docRef = doc(db, 'links', id)
       await deleteDoc(docRef)
    }

    useEffect(()=>{
       const linksRef = collection(db, 'links')
       const queryRef = query(linksRef, orderBy("created", 'asc'))
       const unsub = onSnapshot(queryRef, (snapshot)=>{

          let listas = [] as LinkProps[];
          snapshot.forEach((doc)=>{
            listas.push({
                id: doc.id,
                name: doc.data().name,
                url: doc.data().url,
                bg: doc.data().bg,
                color: doc.data().color
            })
          })

          setLinks(listas)
       } )

       return ()=>{
        unsub()
       }
    },[])

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>
           <form 
           onSubmit={handleRegister}
           className="flex flex-col mt-8 mb-3 w-full max-w-xl">
            <label className="text-white font-medium mt-2 mb-2 ">Nome do link</label>
            <Input
            placeholder="nome do link"
            value={nameInput}
            onChange={ (e)=> setNameInput(e.target.value) }
            />

             <label className="text-white font-medium mt-2 mb-2 ">Url do link</label>
            <Input
            type="url"
            placeholder="digite a url"
            value={url}
            onChange={ (e)=> setUrl(e.target.value) }
            />

            <section className="flex my-4 gap-5">
                <div className="flex my-4 items-center gap-2">
                    <label className="text-white font-medium mt-2 mb-2 ">Cor do link</label>
                    <input type="color"
                    className="rounded-4xl border-none  "
                    value={textColorInput} 
                    onChange={(e)=> setTextColorInput(e.target.value)}/>
                </div>

                <div className="flex my-4 items-center gap-2">
                    <label 
                    className="text-white font-medium mt-2 mb-2 ">Fundo do link</label>
                    <input type="color"
                    className="rounded-4xl border-none  "
                    value={backgroundColorInput} 
                    onChange={(e)=> setBackgroundColorInput(e.target.value)}/>
                </div>
            </section>

            {nameInput !== '' && (
                <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                <label 
                className="text-white font-medium mt-2 mv-3">Cor do link</label>
                <article className="w-11/12  max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                style={{marginBottom: 8, marginTop:8, backgroundColor: backgroundColorInput, color: textColorInput }}
                >
                    <p className="font-medium" style={{color: textColorInput}}>{nameInput}</p>
                </article>
            </div>
            )}

            <button type="submit" className="bg-purple-600 h-9 text-white rounded-md font-medium gap-4 flex justify-center items-center ">Cadastrar</button>
           </form>

           <h2 className="font-bold text-white text-2xl py-2 ">Meus Links</h2>
            {
                links.map((item)=>(
                    <article key={item.id} className="flex items-center  justify-between w-11/12 max-w-xl px-2 py-2 m-1 rounded select-none"
                    style={{backgroundColor: item.bg}}
            
            >
                <p className="font-bold"
                style={{color: item.color}} 
                >{item.name}</p>
                <div>
                    <button 
                    className="cursor-pointer border-dashed p-1 rounded " onClick={()=> deleteTarefa(item.id)}><FiTrash size={18} color="#fff"/></button>
                </div>
                
            </article>
                ))
            }
        </div>
    )
}