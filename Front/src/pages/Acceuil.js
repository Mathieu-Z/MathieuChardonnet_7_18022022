import React, {Component} from 'react';
import Tabs from '../component/Tabs';
import Logo from '../component/Logo';

// necessaire 2 input (ndc,mdp), un event onclick sur bouton, verif des log (API)
class Login extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <Logo />
        <Tabs />
      </div>
    )
  }
}

export default Login