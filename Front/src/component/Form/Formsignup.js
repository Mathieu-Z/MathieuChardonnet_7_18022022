import React from 'react';

export default function FormSignup() {
  return (
    <div>
      <form>
        <div>
          <label>Adresse e-mail</label>
          <input type='email' placeholder='johndoe@mail.com'></input>
        </div>
        <div>
          <label>Mot de passe</label>
          <input type='password'></input>
        </div>
        <div>
          <button type='submit'>Créer mon compte</button>
        </div>
      </form>
    </div>
  )
}