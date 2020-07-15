import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2'
import Axios from '../../Axios'

function DetailVotingPage(props) {
  const [vote, setVote] = useState(null)


  useEffect(()=>{
    Axios.get('/voting/vote/' + props.match.params.id,{
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        }).then(e =>{
            if(!e.data.success) return props.history.push('/error')
            setVote(e.data.dataVote)
            if(e.data.dataVote.userId !== JSON.parse(localStorage.getItem('user'))._id){
             props.history.push('/error')
            }
        })
        // eslint-disable-next-line
  },[])


  function getPeringkat(index){
    if(!vote){
      return 0
    }
   let data = vote.vote.filter(e =>{
     // eslint-disable-next-line
      return e.pilihan == index

    })
  
    return data.length
    
  }

  function getPilihan(index){
    if(!vote){
      return 0
    }
    // eslint-disable-next-line
   if(index == 0){
     return vote.pilihan[0]
   }
   // eslint-disable-next-line
   if(index == 1){
     return vote.pilihan[1]
   }
   // eslint-disable-next-line
   if(index == 2){
     return vote.pilihan[2]
   }
   // eslint-disable-next-line
  }

  const state = vote ? {
    labels: vote.pilihan,
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: 'rgb(49, 188, 252)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [getPeringkat(0), getPeringkat(1), getPeringkat(2)]
      }
    ]
  } : {}

    return (
      <div>
      {!vote ? 'Loading...' :
        <div className="flex flex-col mb-12 mt-8 md:mb-4 md:px-8 justify-center text-center items-center">
             <p className="text-xs md:text-sm lg:text-lg">ID : {vote._id}</p>
              <h1 className="text-blue-500 text-2xl font-black mt-2">{vote.title}</h1>
                <br/>
                <p className="text-gray-500 text-lg items-start">Ini adalah hasil voting anda</p>
            <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2">
            <Bar
          data={state}
          options={{
            title:{
              display:true,
              fontSize:20
            },
            legend:{
              display:false,
              position:'right'
            },
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      callback: function (value) { if (Number.isInteger(value)) { return value; } },
                      stepSize: 1
                  }
              }]
          }
          }}
        />
          </div>

        <div className="text-blue-700"><p className="inline-block text-blue-700 font-bold">
        </p> 
          {vote.vote.length === 0 ? 'Belum ada yang melakukan voting' :
          `${vote.vote.length} telah melakukan voting.`
          }
          </div>
          
          <div className="mt-4 px-2 flex pt-2 flex-col justify-start items-start border-t-2 border-blue-300">
            {
              vote.vote.map((e,i) =>{
              return <div key={i} className="bg-gray-300 border-t-2 border-gray-500 px-2 text-xs md:text-sm lg:text-lg text-left my-1 py-2 w-full">{e.name} telah melakukan voting dan memilih <p className="inline-block text-blue-700 font-black">{getPilihan(e.pilihan)}</p></div>
              })
            }
            
          </div>
          
      
        </div>
          }
          </div>
            
        
    )
}

export default DetailVotingPage
