import React from 'react'
import image from '../../img/404.jpg'
import {Link} from 'react-router-dom'

function ErrorPage() {
    return (
        <div>
        <div className="block mx-auto mt-8 md:w-1/2">
            <img className="" src={image} alt=""/>
        </div>
        <Link to="/" className="mx-auto flex justify-center mt-4 text-blue-700 font-bold text-md lg:text-lg">GO BACK</Link>
        </div>
     
    )
}

export default ErrorPage
