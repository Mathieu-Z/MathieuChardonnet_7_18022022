import { useNavigate } from "react-router-dom";
import { DELETE } from "../Api/Axios";
import ENDPOINTS from "../Api/Endpoints";

function DeleteProfil() {

  const navigate = useNavigate()

  const deleteHandle = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"))
    const userId = userInfo.id

/*    const axios = data => {
      const response = await DELETE(ENDPOINTS.DELETE_USER, {
        userId: data.userId
      })
      if (response.status === 200) {
        setErrorData("Vous n'êtes pas inscrit!");
      }
      if (response.status === 201) {
        setAccountCreated(true);
      }
    }*/

    // suppression d'un compte avec delete
    axios({
      method: "DELETE",
      url: `http://localhost:4200/api/auth/deleteUser?user=${userId}`,
      headers: {
        "Authorization": localStorage.getItem("Token"),
      },
      params: { userId },
      data: {
        id: userId,
      },
    })
      .then(res => {
        localStorage.clear();
        (window.confirm("Votre compte a bien été supprimée!"))
        navigate("/signUp")
      })
      .catch(err => {
        console.log(err)
      })
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