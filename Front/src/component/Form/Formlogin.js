import React from 'react';
import '../Form/Form.scss';

export default function FormLogin() {
  return (
    <div>
      <form>
        <div className=''>
          <label>Adresse e-mail</label>
          <input type='email' placeholder='johndoe@mail.com'></input>
        </div>
        <div>
          <label>Mot de passe</label>
          <input type='password'></input>
        </div>
        <div>
          <button type='submit'>Se connecter</button>
        </div>
      </form>
    </div>
  )
}