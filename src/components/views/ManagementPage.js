import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loading from '../../components/component/LoadingSpinner'
import Axios from '../../Axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {base_url} from '../../WebSetup'


function ucapSalam(){
    let date = new Date().getHours()

    if(date >= 0 && date <= 10){
        return 'Selamat pagi'
    }
    if(date >= 11 && date <= 15){
        return 'Selamat siang'
    }
    if(date >= 16 && date <= 18){
        return 'Selamat sore'
    }
    if(date >= 19 && date <= 23){
        return 'Selamat malam'
    }
}



function ManagementPage(props) {
    const User = JSON.parse(localStorage.getItem('user'))

    const [form, setForm] = useState({
        title: '',
        pilihan1: '',
        pilihan2: '',
        pilihan3: ''
    })


    function getVoting(){
        Axios.get(`/voting/${User._id}`,{
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            }).then(e=>{
                setVotingCollection(e.data)
            })  
    }
    
    const [error, setError] = useState()
    const [link, setLink] = useState()
    const [votingCollection, setVotingCollection] = useState([])
    
    useEffect(() => { 
        Axios.get(`/voting/${User._id}`,{
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            }).then(e=>{
                setVotingCollection(e.data)
                
            })
            // eslint-disable-next-line
    },[])

    function handleBTN(){
        document.getElementById('popupVoting').classList.toggle('hidden')
        document.querySelector('#link-voting').classList.add('hidden')
        document.getElementById('form-voting').classList.remove('hidden')

    }
        
    function handleForm(e){
        const {name,value} = e.target
        setForm(prev =>{
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function btnDelete(id){
        Axios.delete(`/voting/vote/${id}`,{
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        }).then(e =>{
            getVoting()
            toast.info('Data voting berhasil di hapus', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }

    function postVoting(e){
        e.preventDefault()

        document.getElementById('form-voting').classList.add('hidden')
        document.querySelector('.loadingg').classList.remove('hidden')
        if(!form.pilihan1 || !form.pilihan2 || !form.pilihan3){
            toast.error('Isi data dengan lengkap!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return
        }
        Axios({
            method: 'post',
            url: '/voting/add',
            data: {
                userId: User._id,
                title: form.title,
                pilihan: [
                  form.pilihan1,
                  form.pilihan2,
                  form.pilihan3
            ]
            },
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        }).then(e =>{
            if(e.data.success === false){
                setError(
                    e.data.msg
                )
                document.querySelector('.loadingg').classList.add('hidden')
                document.getElementById('form-voting').classList.remove('hidden')
            }else{
                setError()
                setLink(e.data.votes._id)
                document.querySelector('.loadingg').classList.add('hidden')
                document.querySelector('#link-voting').classList.remove('hidden')
                getVoting()
                setForm({
                    title: '',
                   pilihan1: '',
                   pilihan2: '',
                   pilihan3: ''
                })
            }
        })
    }
    return (
        <div>
        <div className="mt-16">
            <div className="bg-blue-600 md:flex justify-between text-white py-12 px-2 md:px-8">
                <div className="">
                <h1 className="font-extrabold text-2xl md:text-3xl">Halo! {ucapSalam()}, {User.name}</h1>
               <p>Manajemen voting anda</p>
               </div>
               <button onClick={handleBTN} className="bg-yellow-600 mt-4 md:mt-0 rounded-full text-white py-1 px-8 text-xl font-extrabold">Buat voting baru</button>

            </div>

            <div className="mt-8 mx-2 md:mx-8">

                {
                    !votingCollection.length ? <div className="text-xs md:text-sm text-gray-500 font-bold lg:text-md">Seperti nya kamu belum pernah membuat voting, untuk membuatnya klik tombol buat voting baru diatas</div> :
                votingCollection.map((e,i) => {
                    return (
                        <div key={i} className="flex hover:bg-blue-200 px-1 py-2 justify-between my-2 items-center">
                        <p className="text-sm flex-1 md:text-md md:text-lg text-blue-700 ">{e.title}</p>
                        <div className="text-xs md:text-lg">
                        <Link to={`/detail/${e._id}`} className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-center mx-1 rounded-full">Detail</Link>
                        <button onClick={()=>btnDelete(e._id)} className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-center mx-1 rounded-full">Hapus</button>
                        </div>
                        </div>
                    )
                })
                }
             

            </div>
        </div>

        <div id="popupVoting" className="rgba-blue hidden fixed top-0 px-4 flex justify-center items-center left-0 bottom-0 right-0 w-full ">

            <div className="bg-white pb-4 w-full relative md:w-10/12 text-center">
                <div onClick={handleBTN} className="font-extrabold cursor-pointer absolute top-0 right-0 rounded-full bg-red-500 py-2 px-2 flex justify-center items-center w-8 h-8 -mt-2 -mr-2 text-white">x</div>
                <h1 className="text-3xl mb-4 py-1 border-b-4 border-blue-300 text-blue-700 bg-blue-200 font-black">BUAT VOTING ANDA</h1>

                {error ? 
             <div className="mx-auto text-center bg-red-500 mt-1 sm:text-sm md:text-md lg:text-lg md:mt-2 text-white py-2 px-2">
                 {error.map((e,i) => {
                    return (
                    <div key={i}>{e}</div>
                    )
                })} 
            </div> : ''}

                <form id="form-voting" autoComplete='off' onSubmit={postVoting} className="mt-8 px-4 flex flex-col items-start" action="">
                    <label className="text-blue-600 font-extrabold" htmlFor="">Judul</label>
                    <input value={form.title} onChange={handleForm} type="text" name="title" className="border-2 py-2 w-full px-2 border-blue-300 " placeholder="ex: Apakah anda .......... ?"/>

                    <label className="text-blue-600 mt-4 font-extrabold" htmlFor="">opsi</label>
                    <input value={form.pilihan1} onChange={handleForm} name="pilihan1" type="text" className="border-2 py-1 w-full px-2 border-blue-300" placeholder="ex: Setuju"/>
                    <input value={form.pilihan2} onChange={handleForm} name="pilihan2" type="text" className="border-2 my-1 py-1 w-full px-2 border-blue-300" placeholder="ex:Warna oren"/>
                    <input value={form.pilihan3} onChange={handleForm} name="pilihan3" type="text" className="border-2 py-1 w-full px-2 border-blue-300" placeholder="ex: Avenged"/>
                    
                    <button disabled={!form.pilihan1 || !form.pilihan2 || !form.pilihan3 ? true: false} className="bg-blue-500 text-white mt-2 px-2 py-1" type="submit">
                        Submit
                        </button>
                </form>

                <div className="loadingg hidden">
                <Loading />  
                </div>
                
                <div id="link-voting" className="hidden w-full px-1 break-words">
                    <h1 className="text-xl md:text-2xl text-gray-700 font-black">Bagikan / Salin kode ini : </h1>
            <h2 className="text-md md:text-lg text-gray-600 pb-4 border-b-4 w-full border-blue-300 font-medium">{link}</h2>

                    <h1 className="text-lg md:text-xl mt-4 text-gray-700 font-bold">Atau bagikan link berikut :</h1>
            <h2 className="text-md md:text-lg w-full text-gray-600">{base_url}/#/vote/{link}</h2>

                    <button onClick={handleBTN} className="text-center mt-8 bg-blue-400 text-white font-bold px-8 rounded-full py-1">OK</button>
                </div>

            </div>

        </div>
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
/>
        </div>
    )
}

export default ManagementPage
