import myFetchServer from '@/services/myFetchServer'; 
import { IProfile, IEditProfileApi } from '@/types/profile';

interface ProfileResponse {
  status: "success" | "error";
  profile?:IProfile;
  msg?: string;
}

export const getProfile = async (): Promise<ProfileResponse> => {
  return await myFetchServer(`/users/profile`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
};


export const editProdile = async (
  productData: IEditProfileApi
): Promise<ProfileResponse> => {
  return await myFetchServer(`/users/profile`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
    method: "PUT",
  });
};



