import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export type CurrentUserResponse = {
  currentUser: CurrentUser;
};

export type CurrentUser = { email: string; id: string } | null;

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["api", "users", "currentuser"],
    queryFn: getCurrentUser,
  });
};

export const getCurrentUser = async () => {
  return axios.get<CurrentUserResponse>("api/users/currentuser");
};
