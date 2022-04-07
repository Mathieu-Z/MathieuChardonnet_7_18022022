import React from 'react';
import '../Form/Form.scss';
import { useState, useEffect } from 'react';
import { POST } from '../Api/Axios';
import ENDPOINTS from '../Api/Endpoints';
import Button from './button';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";


export default function FormLogin() {

  // useState
  const [errorData, setErrorData] = useState("")

  // usenavigate
  const navigate = useNavigate()

  // registrer + err
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(()=>{
    localStorage.clear()
  },[])

/*  const onSubmite = data => {
    //axios
    const response = await POST(ENDPOINTS.USER_LOGIN, {
      email: data.email,
      password: data.password
    });
    if (response.status === 200) {
      setErrorData("Vous n'êtes pas inscrit!");
    }
    if (response.status === 201) {
      setAccountCreated(true);
    }
  };*/

  const onSubmit = data => {
    // axios
    api.post("/auth/login", {
      email: data.email,
      password: data.password
    })
      .then(res => {
        let token = res.data.token
        let user = JSON.stringify(res.data)
        console.log(token + user)
        localStorage.setItem("Token", token)
        localStorage.setItem("user", user)
        localStorage.getItem("user", user, "token", token)
        navigate("/Home")
      })
      .catch(err => {
        console.log(err)
        setErrorData("Vous n'êtes pas inscrit!")
      })
  }

  return (
    <div className="container">
      <Logo />
      <div className="container-form">
        <div className="form-avatar">
          {/*<Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>*/}
          <h4>Login</h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="connect-form">
          {/* email */}
          <label htmlFor="email">Email:</label>
          <br />
            <input
              type="email"
              {...register("email", {
                required: true,
                message: "Vous devez entrer une adresse mail valide",
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          <br />

          {/* password */}
          <label htmlFor="password">Mot de passe:</label>
          <br />
            <input 
              type="password"
              {...register("password", {
                required: true,
                  pattern: {
                    value: /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,64})$/,
                    message: "Vous devez entrer un mot de passe valide. Votre mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
                  },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          <br />
            <input type="submit" value="Connection" className="button" />
          <span className="error-message">{errorData}</span>
        </form>
        <div className="pos-form">
          <Link to = "/signup" style={{textDecoration:"none"}}><p>Pas encore de compte?</p></Link>
        </div>
      </div>
    </div>
  )
}