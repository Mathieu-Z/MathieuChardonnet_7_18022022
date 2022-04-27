import React from 'react';
import Header from '../component/Header';
//import Feed from "../component/Feed";
import './Home.scss'

function Post() {

  return (
    <div>
      <Header />
        <div className="toolbar"></div>
        <main className="main">
          {/*<Feed />*/}
        </main>
    </div>
  );
};

export default Post