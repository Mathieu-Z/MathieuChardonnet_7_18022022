import React, { useState } from "react"
import { useForm } from "react-hook-form"
import DeleteProfil from "./DeleteProfil";
import { PUT } from '../Api/Axios';
import ENDPOINTS from "../Api/Endpoints";
import { useNavigate } from "react-router-dom"


function ModifyProfil() {

  const navigate = useNavigate()
  const [ , setErrorData] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [infoUser] = useState({
    pseudo: "",
    email: "",
    password: ""
  })


  const onSubmitPassword = data => {
    
    PUT(ENDPOINTS.UPDATE_PASSWORD, {
      password: data.password,
      newPassword: data.newPassword,
    })
    .then (respassword => {
      if (respassword.status === 401) {
        setErrorData("Vous n'êtes pas inscrit!");
      }
      if (respassword.status === 201) {
        localStorage.clear();
        (window.confirm("Votre mot de passe a bien été modifié !"))
        navigate("/profil")
      }
    })
    .catch (error => {
    });
  }

  const onSubmitPseudo = data => {

    PUT(ENDPOINTS.UPDATE_PSEUDO, {
      pseudo: data.pseudo,
    })
    .then (resPseudo => {
      if (resPseudo.status === 500) {
        setErrorData("Vous n'êtes pas inscrit!");
      }
      if (resPseudo.status === 200) {
        (window.confirm("Votre pseudo a bien été modifé !"))
        //window.location.reload()
      }
    })
    .catch (error => {
    });
  }

  return (
    <div>
      <div onSubmit={handleSubmit(onSubmitPseudo)} className="container-profil">
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

            <input
              className="button-profil"
              type="submit"
              value="Modifier pseudo"
            />
            
          </div>
        </form>
      </div>

      <div onSubmit={handleSubmit(onSubmitPassword)} className="container-profil">
        <form className="form">
          <div className="form-profil">
          {/*password*/}
          <br />

            <label htmlFor="password" className="password-label">
              Ancien mot de passe:
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
            <br />

            <label htmlFor="password" className="password-label">
              Nouveau mot de passe:
            </label>
            <br />
            <input
              className="form-input"
              defaultValue={infoUser.newPassword}
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
              value="Modifier mot de passe"
            />
            <DeleteProfil />
          </div>
        </form>
      </div>
    </div>
  )
}
export default ModifyProfil;