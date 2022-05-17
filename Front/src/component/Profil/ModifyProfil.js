import React, { useState } from "react"
import { useForm } from "react-hook-form"
import DeleteProfil from "./DeleteProfil";
import { PUT } from '../Api/Axios';
import ENDPOINTS from "../Api/Endpoints";
import { useNavigate } from "react-router-dom"


function ModifyProfil() {

  const navigate = useNavigate()
  const [errorData, setErrorData] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [infoUser, setInfoUser] = useState({
    pseudo: "",
    email: "",
    password: ""
  })


  const onSubmit = data => {
    
    const respassword = PUT(ENDPOINTS.UPDATE_PASSWORD, {
      password: data.password,
    })
    if (respassword.status === 500) {
      setErrorData("Vous n'êtes pas inscrit!");
    }
    if (respassword.status === 204) {
      localStorage.clear();
      (window.confirm("Votre mot de passe a bien été modifié !"))
      navigate("/profil")
    }

    
    const respseudo = PUT(ENDPOINTS.UPDATE_PSEUDO, {
      pseudo: data.pseudo,
    })
    if (respseudo.status === 500) {
      setErrorData("Vous n'êtes pas inscrit!");
    }
    if (respseudo.status === 204) {
      localStorage.clear();
      (window.confirm("Votre pseudo a bien été modifé !"))
      navigate("/profil")
    }

  }

  return (
    <div onSubmit={handleSubmit(onSubmit)} className="container-profil">
      <form className="form">
        <div className="form-profil">
          <label htmlFor="pseudo" className="pseudo-label">
            Pseudo:
          </label>
          <br />

    {/*pseudo*/}
          <input
            type="text"
            defaultValue={infoUser.pseudo}
            name="pseudo"
            className="form-input"
            {...register("pseudo", {
              minLength: {
                value: 3,
                message: "Il faut que votre pseudo ait au moins 3 lettres!",
              },
              maxLength: {
                value: 30,
                message: "Ce pseudo semble trop long...",
              },
            })}
          />
          {errors.pseudo && <span>{errors.pseudo.message}</span>}
          <br />

    {/*password*/}
          <label htmlFor="password" className="password-label">
            Mot de passe:
          </label>
          <br />
          <input
            className="form-input"
            defaultValue={infoUser.password}
            type="password"
            {...register("password", {
              pattern: {
                value: /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*]).{6,64})$/,
                message: "Vous devez entrer un mot de passe valide. Votre mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <br />

          <input
            className="button-profil"
            type="submit"
            value="Modifier"
          />
          <DeleteProfil />
        </div>
      </form>
    </div>
  )
}
export default ModifyProfil;