import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import DeleteProfil from "./DeleteProfil";
import { PUT } from '../Api/Axios';
import ENDPOINTS from "../Api/Endpoints";
import { useNavigate } from "react-router-dom"


function ModifyProfil() {

  const navigate = useNavigate()
  const [errorData, setErrorData] = useState("")

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
                value: 2,
                message: "Il faut que votre pseudo ait au moins 2 lettres!",
              },
              maxLength: {
                value: 30,
                message: "Ce pseudo semble trop long...",
              },
            })}
          />
          {errors.pseudo && <span>{errors.pseudo.message}</span>}
          <br />

    {/*email*/}
          <label htmlFor="email" className="email-label">
            Email:
          </label>
          <br />
          <input
            className="form-input"
            defaultValue={infoUser.email}
            type="email"
            {...register("email", {
              message: "Vous devez entrer une adresse mail valide",
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
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