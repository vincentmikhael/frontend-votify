import React, { Suspense } from 'react'
import loginImg from '../../img/login.png'
import {Switch, Route} from 'react-router-dom'
const LoginView = React.lazy(()=> import('./LoginView'))
const RegisterView = React.lazy(()=> import('./RegisterView'))



function LoginPage() {
    return (
        <div>
            <div className="block md:flex">
                <div className="w-full md:w-1/2 flex pt-2 md:pt-8 justify-center min-h-screen flex-col items-center">
                    <div className="flex-grow">
                    <h1 className="text-5xl font-black text-center text-blue-500">Votify</h1>
                    <Suspense fallback={<div>loading...</div>}>
                    <Switch>
                        <Route exact path="/login" component={LoginView} />
                        <Route exact path="/register" component={RegisterView}/>
                    </Switch>
                    </Suspense>
                    </div>

                    <div className="md:mb-4 mb-2 text-center">By <a className="text-blue-500" href="https://instagram.com/vincent.mikhaell">Vincent Mikhael</a></div>
                </div>
                


                <div className="bg-blue-400 login-image w-1/2 hidden md:flex items-center justify-center min-h-screen fixed right-0 top-0">
                <img className="w-1/2" src={loginImg} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
