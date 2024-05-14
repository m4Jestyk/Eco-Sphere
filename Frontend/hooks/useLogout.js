import { useSetRecoilState } from "recoil";
import userAtom from "../src/atoms/userAtom";
import useShowToast from "./useShowToast";
import { useNavigate } from "react-router-dom";


const useLogout = () => {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();
    const navigate = useNavigate();


    const logout = async () => {
        try {
          const res = await fetch("/api/v1/users/logout", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const data = await res.json();
          console.log(data);
    
          if (data.error) {
            showToast("Error", data.error, "error");
            return;
          }
    
          localStorage.removeItem("user-tootar");
          setUser(null);
          navigate("/auth");
        } catch (error) {
          showToast("Error", error, "error");
        }
      };
      return logout;
}

export default useLogout
