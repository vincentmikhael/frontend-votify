import React, { useEffect, useState } from 'react'
import Axios from '../../Axios'
import Loading from '../component/LoadingSpinner'
import {Link} from 'react-router-dom'

function VotingPage(props) {

    const [vote, setVote] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [clicked, setClick] = useState(false)
    const [form, setForm] = useState({
        name: '',
        pilihan: '',
        alasan: ''
    })

    function checkVoter(){
        Axios.get('/voting/check/' + props.match.params.id).then(e=>{
            if(e.data.success){
                document.querySelector('#errors').classList.remove('hidden')
            }
        })
    }

    useEffect(()=>{
        checkVoter()
        Axios.get('/voting/vote/' + props.match.params.id,{
        }).then(e =>{
            if(!e.data.success) return props.history.push('/error')
            setVote(e.data.dataVote)
            setLoading(false)
        })
        // eslint-disable-next-line
    },[])

    function handlePilihan(e){
        document.querySelectorAll('.pilihan').forEach(e =>{
            e.classList.add('bg-white')
            e.classList.remove('bg-blue-400')
        })
        e.target.classList.remove('bg-white')
        e.target.classList.add('bg-blue-400')
        e.persist()
        setForm(prev =>{
            return {...prev, pilihan: e.target.getAttribute('data-key')}
        })
        setClick(true)
    }


    function alasanHandle(e){
        e.persist()
        setForm(prev =>{
            return {...prev, alasan: e.target.value}
        })
    }
    function namaHandle(e){
        e.persist()
        setForm(prev =>{
            return {...prev, name: e.target.value}
        })
    }

    function uploadVote(){
        Axios({
            method: 'post',
            url: `/voting/vote/${props.match.params.id}`,
            data: {
                name: form.name,
                pilihan: form.pilihan,
                alasan: form.alasan
            },
            headers:{
                'auth-token': localStorage.getItem('auth-token')
            }
        }).then(e =>{
            if(e.data.success === true){
                document.querySelector('#successVote').classList.remove('hidden')
            }else{
                checkVoter()
            }
        })
    }

    return (
        <div>
            <div id="errors" className="rgba-blue hidden fixed top-0 px-4 flex justify-center items-center left-0 bottom-0 right-0 w-full">
               <div  className="bg-white  text-blue-500 pb-4 px-2 w-full flex justify-center flex-col items-center relative md:w-10/12 text-center">
                    <div className="text-bold text-2xl">Ooopss...</div>
                    Sepertinya kamu sudah pernah melakukan voting!

                    <Link className="px-2 py-2 cursor-pointer bg-blue-400 mt-4 text-white" to="/">Kembali</Link>
                </div>

                </div>

                <div id="successVote" className="rgba-blue hidden fixed top-0 px-4 flex justify-center items-center left-0 bottom-0 right-0 w-full">
                
               <div  className="bg-white  text-blue-500 pb-4 px-2 w-full flex justify-center flex-col items-center relative md:w-10/12 text-center">
                    <div className="text-bold cursor-pointer text-xl">Terima kasih telah melakukan voting</div>
                    

                    <Link className="px-2 py-2 bg-blue-400 mt-4 text-white" to="/">Kembali</Link>
                </div>

                </div>
        {isLoading? <Loading /> : 
            
            <div className="flex flex-col justify-center mx-4 md:mx-24">
            <h1 className="text-white px-4 py-2 mb-2 md:mb-2 lg:mb-4 bg-blue-500 rounded-full mt-12 text-xl text-center md:text-4xl font-black">
                {vote.title}
            </h1>
            <div className="flex justify-start mb-4 md:mb-8 lg:mb-16 items-start">
            <input onChange={namaHandle} placeholder="Nama... (wajib)" type="text" className="border-b-2 text-sm lg:text-lg border-blue-400 px-2 py-1" name="" id=""/>
            </div>
            
           
           <div className="flex justify-center w-full md:w-1/2 mx-auto flex-col">
               {vote.pilihan.map((e,i) =>{
                   return (
                       <div key={i} data-key={i} onClick={handlePilihan} className="border-2 pilihan my-1 hover:bg-blue-500 target:bg-blue-500 hover:text-white text-center border-blue-500 rounded-full py-2 px-2 text-blue-600">
                          {e}
                       </div>
                   )
               })}
               

               <label className="text-blue-400 mt-4" htmlFor="alasan">Alasan (Opsional)</label>
               <textarea onChange={alasanHandle} className="border-2 p-1 text-blue-700 border-blue-700 h-32 text-sm md:text-md lg:text-lg" name="" id="alasan"></textarea>
           </div>
           <button onClick={uploadVote} disabled={!clicked} className="mx-auto mt-4 bg-blue-600 text-white py-2 md:px-8 px-4 rounded-full text-lg font-bold">Submit</button>             
            
       </div>
        }
        
        </div>
    )
}

export default VotingPage
