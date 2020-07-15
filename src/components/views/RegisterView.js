import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from '../../Axios'
import Loading from '../component/LoadingSpinner'

function RegisterView(props) {

   const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState({})

    const [isLoading, setIsLoading] = useState(false)

    function inputHandler(e){
        const {name, value} = e.target

        setForm((prevState)=>{
            return {...prevState, [name] : value}
        })
    }

    const submitForm = async (e) => {
            e.preventDefault()
            setIsLoading(true)
                axios.post('/auth/register', {
                name: form.name,
                email: form.email,
                password: form.password
            }).then(res =>{
                if(res.data.success){
                    props.history.push('/login')
                    setError({})
                }else{
                    setError(prev => {
                        return {...prev, error: res.data.msg}
                    })
                }
                setIsLoading(false)
            })
            setForm({
                name: '',
                email: '',
                password: ''
            })
    }

    return (
        <div>
            <h2 className="text-xl mt-4 text-center font-medium">Selamat bergabung!</h2>
            {error.error ? 
             <div className="mx-auto text-center bg-red-500 mt-1 sm:text-sm md:text-md lg:text-lg md:mt-2 text-white py-2 px-2">
                 {error.error.map(e => {
                    return (
                    <div>{e}</div>
                    )
                })} 
            </div> : ''}
                        
                    <form onSubmit={submitForm} className=" mt-8 flex justify-start flex-col " action="">

                        <label className="" htmlFor="nama">Nama</label>
                        <input value={form.name} id="nama" onChange={inputHandler} className="border-2 border-blue-400  w-full px-1" type="text" name="name"/>

                        <label className="mt-4" htmlFor="emaill">Email</label>
                        <input value={form.email} id="emaill" onChange={inputHandler} className="border-2 border-blue-400  w-full px-1" type="text" name="email"/>
                        
                        <label className="mt-4" htmlFor="passwordd">Password</label>
                        <input value={form.password} id="passwordd" type="password" onChange={inputHandler} className="border-2 border-blue-400 px-2"  name="password"/>
        
    <button type="submit" className="bg-blue-500 px-1 py-1 mt-8 text-center text-white font-black">{isLoading ? <Loading /> : 'DAFTAR'}</button>
                    </form>

                    <p className="mt-8 text-center">Sudah punya akun ? <Link to="/login" className="text-blue-500" href="">Login disini</Link></p>
        </div>
    )
}

export default RegisterView
