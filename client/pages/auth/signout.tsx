import { Loader, Stack } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Router from "next/router";
import { useTicketingApiErrors } from "../../hooks/useTicketingApiErrors";
import { useEffect } from "react";

export default function Signout() {
  const { mutate, isPending, error } = useSignout();
  const apiErrors = useTicketingApiErrors(error);

  useEffect(() => mutate(), []);

  return (
    <Stack>
      {isPending && <Loader />}
      {apiErrors}
    </Stack>
  );
}

const useSignout = () => {
  return useMutation({
    mutationFn: () => axios.post("/api/users/signout"),
    onSuccess: () => Router.push("/"),
  });
};
