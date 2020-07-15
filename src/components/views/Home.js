import React,{useState} from 'react'
import imgBanner from '../../img/imgbanner.jpg'
import {Link, Redirect} from 'react-router-dom'


function Home() {

      const [idValue, setIdValue] = useState()

      function handleVoterPage(){
        document.querySelector('.voter').classList.toggle('hidden')
      }

    return (
        <div className="banner mx-2 flex-grow md:mx-12 mt-8 md:flex justify-center items-center">
          <div className="info flex-1">
            <div className="w-full lg:w-4/6">
           <h1 className="text-blue-600 text-2xl text-center md:text-left font-black md:text-4xl">Yuk voting!</h1>
           <h2 className="text-blue-600 text-xl text-center md:text-left font-medium md:text-3xl">Pilihan mu sangat berarti !</h2>
           <div className="text-gray-600 text-center md:text-left text-xs md:text-sm lg:text-lg">Di <p className="inline-block text-blue-500 font-medium">Votify</p> anda dapat membuat voting atau hanya memvoting sesuatu. Untuk membuat voting anda harus daftar terlebih dahulu. Tapi jika anda hanya ingin memvoting, anda tidak perlu login.</div>

          <div className="mt-4 flex justify-center lg:justify-start">
             <Link to="/login" className="bg-blue-400 text-center shadow-lg text-white text-xs md:text-sm lg:text-lg focus:outline-none rounded-full hover:bg-blue-500 py-2 px-2">Saya ingin membuat voting</Link>
             <button onClick={handleVoterPage} className="bg-blue-400 text-xs md:text-sm lg:text-lg shadow-lg ml-4 text-white rounded-full focus:outline-none hover:bg-blue-500 py-2 px-2">Saya ingin melakukan voting</button>
          </div>

           </div>
          </div>
          <div className="img-banner mt-8 md:mt-0 w-5/6 mx-auto md:w-2/5">
          <img src={imgBanner} alt=""/>
          </div>


       
        <div className="voter hidden top-0 left-0 right-0 bottom-0 flex justify-center items-center fixed index-50 w-full h-full">

        <div className="box-login rounded-lg pb-2 md:pb-8 w-4/5 md:w-1/2 lg:w-1/4 text-center absolute bg-white">
        <div onClick={handleVoterPage} className="close-btn cursor-pointer absolute p-1 rounded-full bg-blue-500 -mt-4 -mr-2 text-white top-0 h-8 w-8 right-0">X</div>
            <h1 className="font-bold bg-blue-300 text-xl py-1 mb-4 text-white">VOTING</h1>

        <form className="flex px-8  flex-col" action="">
              <label htmlFor="voter" className="text-blue-700 font-medium">Masukkan ID Voting</label>
              <input onChange={(e) => setIdValue(e.target.value)} placeholder="234xxx" className="border-2 rounded-full md:py-1 px-2 border-blue-400" type="text" name="voter" id="voter"/>
              {
                idValue ? <Link to={`/vote/${idValue}`} className="mt-4 w-full mx-auto md:w-1/2  bg-blue-400 text-white px-2 py-1 md:py-2 rounded-full">Submit</Link> :
                <button className="mt-4 w-full mx-auto md:w-1/2  bg-blue-300 text-white px-2 py-1 md:py-2 rounded-full">Submit</button>
              }
              
            </form>
        </div>

        </div>
        

       </div>
    )
}

export default Home
