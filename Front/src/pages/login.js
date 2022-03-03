import React, {Component} from 'react';

// necessaire 2 input (ndc,mdp), un event onclick sur bouton, verif des log (API)
class Login extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <div>
          <button className='' type='button'>Se connecter</button>
          <button className='' type='button'>Créer un compte</button>
        </div>

        <form>
          <div>
            <label>Adresse e-mail</label>
            <input className='' type='email' placeholder="john@mail.com" name='email'></input>
          </div>
          <div>
            <label>Mot de passe</label>
            <input className='' type='password' name='password' ></input>
          </div>

          <button className='' type='submit' /*onClick={this.props}*/>Se connecter</button>
        </form>
      </div>
    )
  }
}

export default Login