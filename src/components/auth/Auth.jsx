import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Baseurl from "../general/Baseurl"
const Auth = ({ setIsAuthenticated,setUserInfo  }) => {

    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [signForm,setSignForm] = useState(false)

    const navigate = useNavigate()
    const clear = () => {
        setName('');
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const handleSignin = async (e) => {
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }
        try {
            const response = await fetch(`${Baseurl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            })
            const result = await response.json()
            if (response.ok) {
                console.log(result.message)
                localStorage.setItem("isAuthenticated", "true");
                setIsAuthenticated(true)
                setUserInfo(result.user)
                navigate('/dashboard')
            } else {
                console.log(result.message)
            }
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    const handleSignup = async(e)=>{
        e.preventDefault()
        const data = {
            name:name,
            username:username,
            email:email,
            password:password
        }
        await fetch(`${Baseurl}/register`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        clear()
    }
    return(
        <div className="md:w-[90%] md:ml-[5%] mt-16">
            <div className="md:ml-[25%] md:w-[50%] h-auto">
            <div className="text-center md:text-2xl text-xl font-semibold mb-8">{signForm === false ? "Login" : "Register"}</div>
            {signForm === false ? 
                <form onSubmit={handleSignin}>
                <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} required type="text" className="md:w-[70%] font-semibold rounded-md bg-slate-100 md:ml-[15%] w-[80%] ml-[10%] p-2 my-2" />
                <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} required type="password" className="md:w-[70%] font-semibold rounded-md bg-slate-100 md:ml-[15%] w-[80%] ml-[10%] p-2 my-2" />
                <button className="md:w-[70%] md:ml-[15%] w-[80%] ml-[10%] p-2 my-2 font-semibold rounded-md text-white hover:bg-blue-500 bg-green-500">Sign In</button>
                </form>
            
            :(
                <form onSubmit={handleSignup}>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required type="text" className="md:w-[70%] font-semibold rounded-md bg-slate-100 md:ml-[15%] w-[80%] ml-[10%] p-2 my-2" />
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="md:w-[70%] font-semibold rounded-md bg-slate-100 md:ml-[15%] w-[80%] ml-[10%] p-2 my-2" />
                <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required type="text" className="md:w-[70%] font-semibold rounded-md bg-slate-100 md:ml-[15%] w-[80%] ml-[10%] p-2 my-2" />
                <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required type="password" className="md:w-[70%] font-semibold rounded-md bg-slate-100 md:ml-[15%] w-[80%] ml-[10%] p-2 my-2" />
                <button className="md:w-[70%] md:ml-[15%] w-[80%] ml-[10%] p-2 my-2 font-semibold rounded-md text-white hover:bg-blue-500 bg-green-500">Sign Up</button>
                </form>
            )}
            </div>
            <Link  onClick={() => setSignForm(!signForm)}><div className="text-center animate-pulse text-red-500">{signForm === false ? "Don't have an account? Create!" : "Have an account? Log in!"}</div></Link>

        </div>
    )
}

export default Auth