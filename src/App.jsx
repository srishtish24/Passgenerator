import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
const[length,setLength]=useState(8)
const[numberallowed,setNumberallowed]=useState(false)
const[charallowed,setCharallowed]=useState(false)
const[password,setPassword]=useState("")

const passwordGen = useCallback(() => {
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberallowed) str+="0123456789"
  if(charallowed) str+="!@#$%^&*()_+[]{}|"
    for(let i=1;i<=length;i++){
    let char = Math.floor(Math.random()* str.length +1)
    pass += str.charAt(char)
  }
   

  setPassword(pass)
}, [length, numberallowed, charallowed, setPassword])

  useEffect(()=>{
    passwordGen()}, [length, numberallowed, charallowed, passwordGen]
  )
  const passwordref = useRef(null)
const copypasstoclip = useCallback(() => {
  passwordref.current?.select();
  window.navigator.clipboard.writeText(password)},
 [password])
    return (
  
   
  <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>

    <h1 className='text-white text=center'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text" value={password} placeholder='Password' ref={passwordref} readOnly className='w-full px-4 py-2 bg-gray-700 text-white' />
      <button className='outline-none bg-orange-500 text-white px-4 py-2' 
      onClick={copypasstoclip}>Copy</button> </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-2'>
          <input type='range' min={6} max={100} value={length} className='cursor-pointer' 
          onChange={(e) => setLength(e.target.value)} />
          <label> Length : {length}</label>
      </div>  
      <div className='flex items-center gap-x-2'>
      <input type='checkbox' id='numberinput' defaultChecked={numberallowed} 
      onChange={()=> {setNumberallowed((prev)=>!prev);
      }}
        />
        <label htmlFor='numberinput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-2'>
      <input type='checkbox' id='charinput' defaultChecked={charallowed} 
      onChange={()=> {setCharallowed((prev)=>!prev);
      }}
        /> 
        <label htmlFor='charinput'>Characters</label>
      </div> 
       </div> 
       </div>
       

  )
}

export default App
