import { useNavigate } from "react-router-dom";
import { DELETE } from "../Api/Axios";
import ENDPOINTS from "../Api/Endpoints";

function DeleteProfil() {

  const navigate = useNavigate()

  const deleteHandle = () => {

    axios = data => {
      const response = DELETE(ENDPOINTS.DELETE_USER, {
        userId: data.userId
      })
      if (response.status === 500) {
        setErrorData("Vous n'êtes pas inscrit!");
      }
      if (response.status === 204) {
        setAccountCreated(true);
        localStorage.clear();
        (window.confirm("Votre compte a bien été supprimée!"))
        navigate("/Signup")
      }
    }
  }

  return (
    <div className="supprimer-compte">Supprimer compte<onClick {...() => {
      if (window.confirm("Voulez-êtes sûr de vouloir supprimer votre profi?")) {
        deleteHandle()
      }
    }} />
    </div>
  )
}

export default DeleteProfil;