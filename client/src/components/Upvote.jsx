import React,{ useEffect, useState} from 'react'
import axios from 'axios'
import {Button} from '@nextui-org/react'
const Upvote = ({blogId}) => {
    const [count,setCount] = useState(0)
    const [isVoted,setIsVoted] = useState(false)
    useEffect(()=>{
        
        axios.get(`http://localhost:3000/blog/getUpVotes?blogId=${blogId}`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(response=>{
            console.log(response.data.isVoted)
            setCount(response.data.count)
            setIsVoted(response.data.isVoted)

              
        })
    })
   const upVoteOrUnVote = (e) =>{
    e.preventDefault()
    if(isVoted===true){
      setCount(parseInt(count)-1)
      setIsVoted(false)
    }
    else{
      if(count!==0){
        setCount(parseInt(count)+1)
        setIsVoted(true)
      }
    }
    axios.post('http://localhost:3000/blog/upvote',{blogId:blogId},{
      headers:{
        Authorization:localStorage.getItem('token')
      }
    }).then(response=>{
      console.log(response.data)
    }).catch(err=>console.log(err))
   }
  return (
    <Button
    onClick={upVoteOrUnVote}
    color={isVoted===true?'primary':'danger'}>
      upvotes : {count-1}
    </Button>
  )
}

export default Upvote
