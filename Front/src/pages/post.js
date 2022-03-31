import React, {Component} from 'react';
import Header from '../component/Header';

/*
necessite liste des post, trier du plus recent au plus vieux,
un bouton pour poster, un pour modifier
*/

class Post extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <Header />
        
      </div>
    )
  }

}

export default Post