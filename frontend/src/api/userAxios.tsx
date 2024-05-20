import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

export const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/users/profile");
    if (response.status === 200 && response.data.code === 2201) {
      return response.data.response.user[0];
    } else {
      throw new Error("Failed to fetch user profile");
    }
  } catch (error) {
    console.error(error, "Fail getProfile");
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.delete("/users/logout");
    return response;
  } catch (error) {
    console.error(error, "Fail getProfile");
  }
};

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post("/reissue");
    return response;
  } catch (error) {
    console.error(error, "Fail getProfile");
  }
};

// export const useAutoAccessToken = () => {
//   const refreshTokenBeforeExpiry = async () => {
//     const accessToken = Cookies.get("access");
//     if (!accessToken) return;

//     const { exp } = JSON.parse(atob(accessToken.split(".")[1]));
//     const expiresIn = exp * 1000 - Date.now();

//     if (expiresIn < 60 * 60 * 1000) {
//       try {
//         await axiosInstance.post("/reissue");
//         setTimeout(refreshTokenBeforeExpiry, expiresIn - 60 * 60 * 1000);
//       } catch (error) {
//         console.error("Token refresh failed:", error);
//       }
//     } else {
//       setTimeout(refreshTokenBeforeExpiry, expiresIn - 60 * 60 * 1000);
//     }
//   };

//   refreshTokenBeforeExpiry();
// };
