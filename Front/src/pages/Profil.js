import React from "react";
import Header from "../component/Header";
import ModifyProfil from "../component/Profil/ModifyProfil";

function Profil() {
    return (
        <div>
            <Header />
            <div className="toolbar"></div>
            <ModifyProfil />
        </div>
    );
};

export default Profil; 