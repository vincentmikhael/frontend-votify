import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Axios from '../../Axios'
import Loading from '../component/LoadingSpinner'


function LoginView(props) {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    function handleInput(e){
        const {name, value} = e.target

        setForm(prev=>{
            return {...prev, [name]: value}
        })
    }

  async function submitLogin(e){
        e.preventDefault()

        setIsLoading(true)

        
        Axios.post('/auth/login', {
            email: form.email,
            password: form.password
        }).then(res=>{
            if(res.data.success){
                setIsLoading(false)
                setError({})
            setForm({
                email: '',
                password: ''
            })
            localStorage.setItem('auth-token', res.data.token)

            Axios.get('/auth/profile', {
                headers:{
                    'auth-token': localStorage.getItem('auth-token')
                }
            }).then(e=>{
                localStorage.setItem("user",JSON.stringify(e.data))
                props.history.push('/admin')
                
                
            }).catch(e=>{
                console.log('error :' + e)
            })

            }else{
                setIsLoading(false)
                setError(prev =>{
                    return {...prev, error: res.data.msg}
                })
            }
        })

    }

    return (
        <div>
            <h2 className="text-xl mt-4 text-center font-medium">Selamat datang!</h2>

            {error.error ? 
             <div className="mx-auto text-center bg-red-500 mt-1 sm:text-sm md:text-md lg:text-lg md:mt-2 text-white py-2 px-2">
                 {error.error.map((e,i) => {
                    return (
                    <div key={i}>{e}</div>
                    )
                })} 
            </div> : ''}
                    
                    <form onSubmit={submitLogin} className=" mt-8 flex justify-start flex-col " action="">

                        <label htmlFor="">Email</label>
                        <input value={form.email} onChange={handleInput} className="border-2 border-blue-400  w-full px-1" type="text" name="email" id=""/>
                        
                        <label className="mt-4" htmlFor="">Password</label>
                        <input value={form.password} onChange={handleInput} className="border-2 border-blue-400 px-2" type="password" name="password" id=""/>

                        <button type="submit" className="bg-blue-500 px-1 text-center py-1 mt-8 text-white font-black">{isLoading ? <Loading /> : 'Login' }</button>
                    </form>

                    <p className="mt-8 text-center">Belum punya akun ? <Link to="/register" className="text-blue-500" href="">Daftar sekarang</Link></p>
        </div>
    )
}

export default LoginView
