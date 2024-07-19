import React from 'react'
import { useState, useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'


const Login = () => {

  const  { NavbarSelect } = useContext(ShopContext)

  const [state, setState] = useState("Login")

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  })

  const changeHandle = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  const logIn = async () => {
    console.log("logIn", formData);

    setFormData({
      ...formData,
      email: ""
    })

    await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem('token', data.token);
          NavbarSelect("select1")
          location.replace('/');
        } else {
          alert(data.errors);
        }
      })

  }
  const signUp = async () => {

    console.log("signUp", formData);

    await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          alert("Sign up successful")
          location.replace('/');
        } else {
          alert(data.errors);
        }
      })

  }



  return (
    <div className='flex flex-col h-[90vh] items-center justify-center  bg-slate-100 ' >

      <div className='flex flex-col items-center gap-4  w-[45%] bg-white py-10 rounded-2xl shadow-lg'>

        <h3 className='text-3xl font-bold'>{state}</h3>
        <div className='flex flex-col gap-2 text-lg font-semibold w-[350px]'>

          {state === "Sign Up" ? <><span>Name</span><input type="text" placeholder="Your name" name='username' value={formData.username} onChange={changeHandle} className="border-[2px] rounded-md p-2" /></> : ""}

          <span>Email</span>
          <input type="email" name='email' value={formData.email} onChange={changeHandle} placeholder='Your Email' className='border-[2px] rounded-md p-2 ' />
          <span>Password</span>
          <input type="password" name='password' value={formData.password} onChange={changeHandle} placeholder='Password' className='border-[2px] rounded-md p-2' />
        </div>
        <button onClick={() => { state === "Login" ? logIn() : signUp() }} className='bg-orange-600 rounded-3xl text-center text-white text-xl py-2 w-[350px]'>Continue</button>

        {state === "Sign Up" ?
          <p className='w-[350px]'>Aready have an acount? <span className='font-bold underline cursor-pointer text-orange-400' onClick={() => setState("Login")}>Log in</span></p> :
          <p className='w-[350px]'>Don't have an acount? <span className='font-bold underline cursor-pointer text-orange-400' onClick={() => setState("Sign Up")}>Create Acount</span></p>}

        <div className='flex gap-1'>
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use and policy.</p>
        </div>
      </div>

    </div>
  )
}

export default Login