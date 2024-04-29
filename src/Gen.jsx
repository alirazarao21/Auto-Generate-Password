import { useCallback, useState, useEffect ,useRef} from "react";

function Generate() {
    const [length, setLength] = useState(8);
    const [allowNum, setAllowNum] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    //useRef hook for relation two things // copy krna ka liya yaha use kr raha h konsi field copy ho

const passwordRef = useRef(null);

    const passwordGenerate = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (allowNum) str += "0123456789";
        if (charAllowed) str += "!@#$%&*+";

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [length, allowNum, charAllowed]);

    const copyPastToClipboard=useCallback(()=>{
        passwordRef.current?.select() //hamna password ref input area ha jo copy button ka sath bnaya tha osma useref banya ha jiski help sa ab hama pta hal raha ha
        window.navigator.clipboard.writeText(password) //window object react ma driect use kr sakhta h  jab ka next.js ma ham use ni kr sakhta window ko kyoka wo server send h
    },[password])

    useEffect(() => {
        passwordGenerate();
    }, [length, allowNum, charAllowed]);
    
    return (
        <div className="bg-slate-600 my-4 w-96 py-3 mx-auto mt-4 rounded-2xl text-center">
            <div className="mx-auto w-full">
                <div className="my-2 mx-2 w-84 flex ">
                    <input
                        type="text"
                        value={password}
                        placeholder="password"
                        readOnly
                        ref={passwordRef}
                        className="outline-none w-full px-4 py-3 rounded-l-lg text-orange-800"
                    />
                    <button onClick={copyPastToClipboard} className="bg-blue-700 rounded-r-lg p-2  text-center text-white" type="button">copy</button>
                </div>
            </div>
            <div className="flex text-sm gap-x-2">
                <div className="flex items-center gap-x-1">
                    <input
                        type="range"
                        min={8}
                        max={100}
                        value={length}
                        className="cursor-pointer mx-2"
                        onChange={(e) => { setLength(parseInt(e.target.value)); }}
                    />
                    <label>length:{length}</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input
                        type="checkbox"
                        defaultChecked={allowNum}
                        id="numberInput"
                        onChange={() => { setAllowNum((prev) => !prev); }}
                    />
                    <label htmlFor="numberInput">Numbers</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input
                        type="checkbox"
                        defaultChecked={charAllowed}
                        id="characterInput"
                        onChange={() => { setCharAllowed((prev) => !prev); }}
                    />
                    <label htmlFor="characterInput">Characters</label>
                </div>
            </div>
        </div>
        
    );
}
export default Generate;