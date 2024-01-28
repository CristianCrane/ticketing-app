import { NextPageContext } from "next";
import { Stack, Text } from "@mantine/core";
import { CurrentUser } from "../hooks/useCurrentUser";

const LandingPage = ({
  currentUser,
}: {
  test: string;
  currentUser: CurrentUser;
}) => {
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

LandingPage.getInitialProps = async (context: NextPageContext) => {
  return { test: "test" };
};

export default LandingPage;
