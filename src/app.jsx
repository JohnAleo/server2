import React, { useEffect, useState } from 'react'
import axios from "axios"
import { BaseURL, errConsole } from './config';
const App = () => {
  const[name,setName]=useState("");
  const [age,setAge]=useState("")
  const [datalist, setDatalist]=useState([])
  const[newName,setNewName]=useState("");
  const [newAge,setNewAge]=useState("")
  useEffect(()=>{
    fetchData(); 
  })
  const fetchData=async()=>{
    try {
      const response= await axios.get(BaseURL);
      setDatalist(response.data);
    } catch (error) {
     console.log(errConsole,error) 
    }
  }

  const handleSubmit =async (event)=>{
    event.preventDefault();
    try{
      const response=await axios.post(BaseURL,
      {
        name,age
      });
      console.log(response.data);
      fetchData();
    } catch(error){
      console.error(errConsole,error);
    }
  }

  const handleEdit = async(oldname) =>{
    try {
      const response=await axios.put(`${BaseURL}/${oldname}`, {
      newName,
      newAge,  
      })
      console.log(response.data)

      setNewName("");
      setNewAge("");
      fetchData();
    } catch (error) {
      console.error(errConsole)
    }
  }

  const handleDelete= async(oldname)=>{
    try {
      const response= await axios.delete(`${BaseURL}/${oldname}`);

      console.log(response.data);
    } catch (error) {
      console.error(errConsole)
    }
  }
  return (
    <div>
      <h1 style={{display:`flex`,justifyContent:`start`,alignItems:`center`}}>Send Data</h1>
      <form onSubmit={handleSubmit} style={{display:`flex`,justifyContent:`start`,alignItems:`center`}}>
        <input type="text" value={name}
        onChange={(e)=> setName (e.target.value)}
        placeholder='posting data' />
        <input type="text" value={age}
        onChange={(e)=> setAge (e.target.value)}
        placeholder='posting data' />
        <button type='submit'>Send data</button>
      </form>
      <h1 style={{display:`flex`,justifyContent:`start`,alignItems:`center`}}>NewCaravanDataList</h1>

      <ul>
        {datalist.map((value,index)=>{
          return(
            <div key={index} style={{display:`flex`,justifyContent:`start`,alignItems:`center`}}>
              <li>
                {value.name}
                <input type="text" 
                value={newName}
                onChange={(e)=> setNewName(e.target.value)}
                placeholder='new name'
                />
              </li>
              <li>
                {value.age}
                <input type="text" 
                value={newAge}
                onChange={(e)=> setNewAge(e.target.value)}
                placeholder='new age'
                />
              </li> 
              <button onClick={()=>handleEdit(value.name)}>Edit</button>
              <button onClick={()=>handleDelete(value.name)}>Delete</button>
            </div>
      )
      })}
      </ul>
    </div> 
  )
}

export default App