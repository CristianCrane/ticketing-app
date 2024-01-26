import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Stack, Text } from "@mantine/core";
import { CurrentUser } from "../hooks/useCurrentUser";
import { buildNginxClient } from "../api/build-client";

const LandingPage = ({
  currentUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Stack>
      <h1>landing</h1>

      {currentUser ? (
        <Text>Hello {currentUser?.email}</Text>
      ) : (
        "You are not signed in"
      )}
    </Stack>
  );
};

export const getServerSideProps = (async (context) => {
  const nginxClient = buildNginxClient(context);
  const res = await nginxClient.get<CurrentUser>("/api/users/currentuser");
  return { props: { currentUser: res.data.currentUser } };
}) satisfies GetServerSideProps<{ currentUser: CurrentUser["currentUser"] }>;

export default LandingPage;
