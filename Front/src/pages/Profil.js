import React from "react";
import Header from "../component/Header";
import ModifyProfil from "../component/Profil/ModifyProfil";
import "./Profil.scss"

function Profil() {
    return (
        <div className="container">
            <Header />
            <div className="toolbar"></div>
            <ModifyProfil />
        </div>
    );
};

export default Profil; 