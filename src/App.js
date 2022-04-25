import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import mockApi from './mockApi.json'
import fakeApi from './fakeApi.xml'
import axios from 'axios';
import XMLParser from 'react-xml-parser';


const App = () => {
  const [person, setPerson] = useState([])
  useEffect(()=>{
    console.log("mockApi", mockApi.person)
    axios.get(fakeApi, {
      "Content-Type": "application/xml; charset=utf-8"
   })
   .then((response) => response.data).then((data)=>{
    let p = [];
    const xml = new XMLParser().parseFromString(data);
    const apiData = xml.children
    apiData.map((data)=>{
      let personObj = {}
      for (let keyValue of data.children){
        const {name, value} = keyValue
       personObj[name] = name.includes('id')? +value: value
      }
      p.push(personObj)
    })
    const arr = [...mockApi.person, ...p]
    arr.sort((a,b)=>a.id - b.id)
    setPerson(arr)
   });
   
  },[])
  return (
    <div className="App">
       {person && person.map((data)=>(
         <>
         <div style={{display: 'flex', margin:'10px'}}>
         <h1 style={{margin:'5px'}} >{data.id}</h1>
         <h2  style={{margin:'5px'}}>{data.firstName}</h2>
         <h2  style={{margin:'5px'}}>{data.lastName}</h2>
         </div>
         </>
       ))}
    </div>
  );
}

export default App;
