import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { DELETE } from "../Api/Axios";
import ENDPOINTS from "../Api/Endpoints";
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteProfil() {

  const navigate = useNavigate()
  const [data, setErrorData] = useState("")

  const deleteHandle = () => {

    const response = DELETE(ENDPOINTS.DELETE_USER, {
      userId: data.userId
    })
    if (response.status === 500) {
      setErrorData("Vous n'êtes pas inscrit!");
    }
    if (response.status === 204) {
      localStorage.clear();
      (window.confirm("Votre compte a bien été supprimée!"))
      navigate("/signup")
    }
  }

  return (
    <div className="supprimer-compte">Supprimer compte<DeleteIcon onClick {...() => {
      if (window.confirm("Voulez-êtes sûr de vouloir supprimer votre profi?")) {
        deleteHandle()
      }
    }} />
    </div>
  )
}

export default DeleteProfil;