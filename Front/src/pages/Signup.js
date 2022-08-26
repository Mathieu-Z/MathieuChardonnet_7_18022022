import React, { useState } from 'react';
import './LogSign.scss';
import { useForm } from "react-hook-form";
import { POST } from '../component/Api/Axios';
import ENDPOINTS from '../component/Api/Endpoints';
import Logo from '../component/Logo';
import { useNavigate } from "react-router-dom";


function SignUp() {

  const [errorData, setErrorData] = useState("")

  // gestion du formulaire avec useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // navigate
  const navigate = useNavigate()

  const onSubmit = data => {
    POST(ENDPOINTS.USER_SIGNUP, {
      pseudo: data.pseudo,
      email: data.email,
      password: data.password
    })
    .then (response => {
      if (response.status === 400) {
        setErrorData("Vous êtes déjà inscrit à cette adresse mail, connectez-vous !");
      }
      if (response.status === 200) {
        setErrorData("Compte créé")
        navigate("/login")
      }
    })
    .catch (error => {
    });
  };
  
  return (
    <div className="container">
      <Logo />
      <div className="container-form">
        <h3>Inscription</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="inscription-form">
          {/* pseudo */}
          <label htmlFor="pseudo">Pseudo:</label>
          <br />
          <input
            {...register("pseudo", {
              required: true,
              minLength: {
                value: 2,
                message: "Vous devez entrer au moins 2 caractères",
              },
              maxLength: {
                value: 15,
                message: "Vous devez entrer au maximum 15 caractères",
              },
            })}
          />
          {errors.pseudo && <span>{errors.pseudo.message}</span>}
          <br />

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
                message:"Votre mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <br />

          <input type="submit" value="Inscription" className="button" />

          <span className="error-message">{errorData}</span>{" "}
        </form>
      </div>
    </div>
  )
}

export default SignUp;