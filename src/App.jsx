import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
const [length,setlength]=useState(8);
const [numAllowed,setnumAllowed]=useState(false);
const [charAllowed,setcharAllowed]=useState(false);
const [Password,setPassword]=useState("");

// useRef for relating two different fields , used to copy password to the clipboard
const passwordRef = useRef(null);

const PasswordGeneator = useCallback(()=>{
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqkrstuvwxyz"
  if (numAllowed) str += "0123456789"
  if (charAllowed) str +="!@#$%^&*"

  for (let i = 1; i <=length; i++) {
    let char = Math.floor(Math.random()* str + 1)
     
    pass += str.charAt(char)
  }

    setPassword(pass)
   
  
},[length,numAllowed,charAllowed,setPassword])

const copyPasswordtoClipboard=useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectRange(0,6);
  },[Password])


useEffect(()=>{PasswordGeneator()},[length,numAllowed,charAllowed,PasswordGeneator])
  return (
    <div className='w-full max-w-md mx-auto shadow-md mb-5 rounded-lg px-4 my-9 text-orange-500 bg-gray-700'>
      <h1 className='text-xl text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value={Password}
        className='outline-none w-full py-1 px-2 mb-5'
        placeholder='Password'
        readOnly
        ref={passwordRef}
         />
         <button onClick={copyPasswordtoClipboard} className='outline-none bg-blue-700  text-white px-3 py-0.5 shrink-0 mb-5'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={30}
          value={length}
          className='cursor-pointer '
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label >Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={numAllowed}
           id="numberInput"
           onChange={()=>{setnumAllowed((prev)=> !prev)}} 
           />
           <label >Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox" 
           defaultChecked={charAllowed} 
           id="charInput" 
           onChange={()=>{setcharAllowed((prev)=> !prev)}}
           />
           <label >Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
