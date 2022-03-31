import React, { useState, useRef } from 'react';
import "./Form.scss";
import { POST } from '../Api/Axios';
import ENDPOINTS from '../Api/Endpoints';
import Button from './button';

import { useNavigate } from "react-router-dom";


const Form = ({ form }) => {

  const [userSignup, setUserSignup] = useState({
    user_pseudo: "",
    user_email: "",
    user_password: "",
  });

  const [userLogin, setUserLogin] = useState({
    user_email: "",
    user_password: "",
  });

  const [passwordFlag, setPasswordFlag] = useState({
    length: false,
    min: false,
    maj: false,
    num: false,
    special: false,
  });

  const [loginError, setLoginError] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const refSignupPseudo = useRef();
  const refSignupEmail = useRef();
  const refSignupPassword = useRef();
  const refSignupPasswordInfos = useRef();
  const refSignupPasswordConfirmation = useRef();

  const refSignupPseudoError = useRef();
  const refSignupEmailError = useRef();
  const refSignupPasswordError = useRef();
  const refSignupPasswordConfirmationError = useRef();

  const checkEmail = (email) => {
    if (email.trim() === "") {
      refSignupEmailError.current.innerText = "";
    } else {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const check = regex.test(String(email).toLowerCase());
      refSignupEmailError.current.innerText = `${
        check ? "" : "Email incorrect"
      }`;
      if (check) return true;
    }
  };

  const checkPseudo = (pseudo) => {
    //console.log(user_pseudo)
    if (pseudo.trim() === "") {
      refSignupPseudoError.current.innerText = "";
    } else if (
      pseudo.trim().length < 2 ||
      pseudo.trim().length > 30
    ) {
      refSignupPseudoError.current.innerText =
        "Votre nom doit faire entre 2 et 30 caractères";
    } else {
      refSignupPseudoError.current.innerText = "";
      return true;
    }
  };

  const checkPassword = (password) => {
    setPasswordFocus(true);
    var flags = {
      length: false,
      min: false,
      maj: false,
      num: false,
      special: false,
    };

    if (password.length >= 10) {
      flags.length = true;
    }
    if (password.match(/[a-z]/, "g")) {
      flags.min = true;
    }
    if (password.match(/[A-Z]/, "g")) {
      flags.maj = true;
    }
    if (password.match(/[0-9]/, "g")) {
      flags.num = true;
    }
    if (password.match(/\W|_/g)) {
      flags.special = true;
    }
    setPasswordFlag((prev) => ({ ...prev, ...flags }));
  };

  const checkSamePassword = () => {
    if (
      refSignupPasswordConfirmation.current.value ===
      refSignupPassword.current.value
    ) {
      refSignupPasswordConfirmationError.current.innerHTML = "";
      return true;
    } else {
      refSignupPasswordConfirmationError.current.innerHTML =
        "Les mots de passe ne correspondent pas";
    }
  };
  
  const signup = async (e) => {
    try {
      e.preventDefault();

      const { length, min, maj, num, special } = passwordFlag;
      if (
        checkPseudo() &&
        checkEmail(refSignupEmail.current.value) &&
        length &&
        min &&
        maj &&
        num &&
        special &&
        checkSamePassword()
      ) {
        const response = await POST(ENDPOINTS.USER_SIGNUP, userSignup);
        if (response.status === 200) {
          refSignupEmailError.current.innerText = "Email déjà enregistré";
        }
        if (response.status === 201) {
          setAccountCreated(true);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const navigate = useNavigate();
  const login = async (e) => {
    try {
      e.preventDefault();
      const response = await POST(ENDPOINTS.USER_LOGIN, userLogin, {
        withCredentials: true,
      });
      if (!response.data.error) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        const toRedirect = (link) => {
          navigate.push(link);
        };
        toRedirect("/");
      } else {
        setLoginError(response.data.message);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      {form === "register" ? (
        <form className="form" onSubmit={signup}>
          {
            <>
              <input
                type="text"
                className=""
                placeholder="Pseudo"
                id="Pseudo"
                name="Pseudo"
                onChange={(e) =>
                  setUserSignup({
                    ...userSignup,
                    user_pseudo: e.target.value,
                  })
                }
                onBlur={checkPseudo}
                value={userSignup.user_pseudo}
                ref={refSignupPseudo}
              />
              <div
                className="pseudo error"
                ref={refSignupPseudoError}
              ></div>
              
              <input
                type="email"
                className="input_container"
                placeholder="Adresse email"
                id="email"
                name="email"
                onChange={(e) =>
                  setUserSignup({ ...userSignup, user_email: e.target.value })
                }
                onBlur={(e) => checkEmail(e.target.value)}
                value={userSignup.user_email}
                ref={refSignupEmail}
              />
              <div className="email error" ref={refSignupEmailError}></div>

              <input
                type="password"
                className="input_container"
                placeholder="Mot de passe"
                id="password"
                name="password"
                onChange={(e) => {
                  setUserSignup({
                    ...userSignup,
                    user_password: e.target.value,
                  });
                  checkPassword(e.target.value);
                }}
                onBlur={() => {checkSamePassword();}}
                value={userSignup.user_password}
                ref={refSignupPassword}
              />            
              <div
                className="password error"
                ref={refSignupPasswordError}
              ></div>

              {passwordFocus ? (
                <ul className="password infos" ref={refSignupPasswordInfos}>
                  <div>
                    <li className="length">
                      {passwordFlag.length ? "✔️" : "❌"} 10 caractères
                    </li>
                    <li className="maj">
                      {passwordFlag.maj ? "✔️" : "❌"} Une majuscule
                    </li>
                    <li className="min">
                      {passwordFlag.min ? "✔️" : "❌"} Une minuscule
                    </li>
                    <li className="num">
                      {passwordFlag.num ? "✔️" : "❌"} Un nombre
                    </li>
                    <li className="special">
                      {passwordFlag.special ? "✔️" : "❌"} Un caractère spécial
                    </li>
                  </div>
                </ul>
              ) : null}
              <input
                type="password"
                className="input_container"
                placeholder="Confirmer le mot de passe"
                id="password"
                name="password"
                ref={refSignupPasswordConfirmation}
                onChange={() => {
                  checkSamePassword();
                }}
              />
              <div
                className="password-conf error"
                ref={refSignupPasswordConfirmationError}
              ></div>
            </>
          }
          <Button name="Inscription" />
          <div className="account-created succes">
            {accountCreated && "Vous pouvez maintenant vous connecter !"}
          </div>
        </form>

      ) : (

        <form className="form" onSubmit={login}>
          <input
            type="email"
            className="input_container"
            placeholder="Adresse mail"
            id="login-email"
            name="email"
            onChange={(e) =>
              setUserLogin({
                ...userLogin,
                user_email: e.target.value,
              })
            }
            value={userLogin.user_email}
          />
          <input
            type="password"
            className="input_container"
            placeholder="Mot de passe"
            id="login-password"
            name="password"
            onChange={(e) =>
              setUserLogin({
                ...userLogin,
                user_password: e.target.value,
              })
            }
            value={userLogin.user_password}
          />
          <div className="login_error">{loginError}</div>
          <p></p>
          <Button name="Connexion" />
        </form>
      )}
    </>
  );
};

export default Form;