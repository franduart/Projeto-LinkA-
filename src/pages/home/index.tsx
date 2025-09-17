import { Social } from "../../components/Social"
import { useState, useEffect } from "react"
import { FaGithub, FaLinkedin, FaRegSmileWink  } from "react-icons/fa"
import { db } from "../../services/firebaseConection"
import { FaChalkboardUser } from "react-icons/fa6";

import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from 'firebase/firestore'

interface LinkProps{
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}

interface SocialProps{
    portfolio: string,
    linkdin: string,
    github: string,
}

export function Home(){
    const [links, setLinks] = useState<LinkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialProps>()

    useEffect(()=> {
        function loadLinks(){
            const linkRef = collection(db, 'links')
            const queryRef = query(linkRef, orderBy('created', 'asc') )

            getDocs(queryRef)
            .then((snapshot)=>{
              let lista = [] as LinkProps[];

              snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
              })
              setLinks(lista)
              
              
            }).catch((error)=>{
                console.log(error)
            })
        }
        loadLinks()
    },[])

    useEffect(()=>{
       const docRef = doc(db, 'social', 'link')
       getDoc(docRef)
       .then((snapshot)=>{
        function loadSocialLinks(){
             if(snapshot.data() !== undefined ){
            setSocialLinks({
                portfolio: snapshot.data()?.portfolio,
                linkdin: snapshot.data()?.linkdin,
                github: snapshot.data()?.github,

            })
         }
        }
        loadSocialLinks()
       }).catch((error)=>{
          console.log(error)
       })
    },[])
    return(
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white  ">Francieli Duarte </h1>
            <span className="text-gray-50 mb-5 md-3 flex items-center justify-between gap-2">Veja meus Links <FaRegSmileWink /></span>

            <main className="flex flex-col w-11/12 text-center">

            {links.map((item) =>(
                <section key={item.id} className=" mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
                style={{backgroundColor: item.bg}}>
             <a href={item.url}>
                <p className="text-base md:text-lg" style={{color: item.color}}>{item.name} </p>
             </a>
            </section>
            ))}

           
            {
                socialLinks && Object.keys(socialLinks).length > 0 && (
                     <footer className="flex justify-center gap-3 my-4 cursor-pointer">
                    <Social url={socialLinks.portfolio}>
            <FaChalkboardUser size={35} color="#fff" />
            </Social>

            <Social url={socialLinks.linkdin}>
            <FaLinkedin size={35} color="#fff"/>
            </Social>

            <Social url={socialLinks.github}>
            <FaGithub size={35} color="#fff"/>
            </Social>
                        </footer>
                )
            }

            </main>
        </div>
    )
}