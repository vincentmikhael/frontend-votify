import React, {Suspense} from 'react';
import {Route, Switch, withRouter,Link} from 'react-router-dom'
import {PrivateRoute, PublicRoute} from './components/utils/PrivateRoute'
import isLogin from './components/utils/isLogin'

const Home = React.lazy(()=> import('./components/views/Home'))
const LoginPage = React.lazy(() => import('./components/views/LoginPage'))
const VotingPage = React.lazy(()=> import('./components/views/VotingPage'))
const ManagementPage = React.lazy(()=> import('./components/views/ManagementPage'))
const DetailVotingPage = React.lazy(()=> import('./components/views/DetailVotingPage'))
const ErrorPage = React.lazy(()=>import('./components/views/ErrorPage'))



function App(props) {

  function logout(){
    localStorage.clear()
    props.history.push('/login')
  }

  return (
    <div className="flex flex-col min-h-screen">
      {props.location.pathname === '/login' || props.location.pathname === '/register' ? '' : 
        <div className="">
          <div className="circle-blue"></div>
        <header className="flex px-2 md:px-12 justify-between items-center">
        <div className="logo">
          <p className="text-white txt-shadow font-medium text-4xl">Votify</p>
        </div>
        <nav className="text-blue-400 w-1/2 md:w-1/4 lg:w-1/6 font-bold flex text-sm md:text-lg justify-around">
          <Link to="/">Home</Link>
          {
            isLogin() ? <div onClick={logout} className="cursor-pointer">Logout</div> : ''
          }
        </nav>
      </header>
      </div>
      }
       
       <div className="flex-grow">
       <Suspense fallback={<div>Loading....</div>}>
           <Switch>
            <PublicRoute restricted={true} exact path="/" component={Home}/>
            <PublicRoute restricted={true} exact path="/login" component={LoginPage}/>
            <PublicRoute restricted={true} exact path="/register" component={LoginPage}/>
            <PublicRoute restricted={false} exact path="/vote/:id" component={VotingPage} />
            <PublicRoute restricted={false} path="/error" component={ErrorPage} />
            <PrivateRoute exact path="/admin" component={ManagementPage} />
            <PrivateRoute exact path="/detail/:id" component={DetailVotingPage} />
           </Switch>
       </Suspense>
       </div>
        
        {props.location.pathname === '/login' || props.location.pathname === '/register' ? '' : 
        <footer className="bg-blue-600 w-full py-2 md:py-4 text-white text-center"> 
          <p className="text-xs">By <a className="text-md font-bold md:text-lg" href="https://www.instagram.com/vincent.mikhaell">Vincent Mikhael</a></p>
        </footer>
        }
        
       
       
    </div>
  );
}

export default withRouter(App);
