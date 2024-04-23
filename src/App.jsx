import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [ charAllowed, setCharAllowed] = useState(false);
  const[numberAllowed, setNumberAllowed] = useState(false)
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let pass ="";

    if( charAllowed) str += "!@#$%^&*-_+=[]{}~`"
    if(numberAllowed) str +=  "0123456789"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char);
    }
    setPassword(pass)

  },[password, charAllowed, numberAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator();
  }, [ length, charAllowed, numberAllowed]);

  const copyPassword = ()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }

  return (
    <>
     <div className="bg-slate-500 h-[100vh] pt-48">
        <div className=" w-[500px] flex gap-2 flex-col p-10 mx-auto rounded-md bg-slate-600 border border-slate-500 shadow-md text-orange-500 ">
          <h2 className='text-4xl mb-4 text-center text-white'>Password Generator</h2>
          <div className=" w-full flex  ">
             <input type="text" ref={passwordRef} className='w-full px-2 py-1 rounded-ss-lg outline-none ' readOnly value={password} name='password' />
             <button className='bg-lime-500 rounded-ee-lg  outline-none shrink-0 text-white px-2 py-1 ' onClick={copyPassword}>copy</button>
          </div>
          <div className="flex text-center gap-x-2">
            
            <div className="flex items-center gap-x-1">
              <input type="range" min={6} max={100} onChange={(e)=>setLength(e.target.value)} />
              <span>Length {length}</span>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox" defaultChecked={numberAllowed} onClick={()=>setNumberAllowed(prev=>!prev)} />
              <span>Number</span>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox" defaultChecked={ charAllowed} onClick={()=>setCharAllowed(prev=>!prev)} />
              <span>character</span>
            </div>
          </div>
        </div>
     </div>
    </>
  )
}

export default App
