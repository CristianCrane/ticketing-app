// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import type { AppContext, AppProps } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { buildClient } from "../api/build-client";
import { CurrentUser, CurrentUserResponse } from "../hooks/useCurrentUser";
import { AppLayout } from "../components/AppLayout";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const queryClient = new QueryClient();

export type AppPropsWithUser = AppProps & { currentUser: CurrentUser };

const AppComponent = (appProps: AppPropsWithUser) => {
  const { Component, pageProps, currentUser } = appProps;

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <AppLayout currentUser={currentUser}>
          <Component {...pageProps} currentUser={currentUser} />
        </AppLayout>
      </MantineProvider>
    </QueryClientProvider>
  );
};

AppComponent.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get<CurrentUserResponse>(
    "/api/users/currentuser",
  );

  // when using next's getInitialProps on the AppComponent, downstream pages' `getInitialProps` are disabled.
  // to get around this, we'll call it manually.
  let pageProps = {};
  const getInitPageProps = appContext.Component.getInitialProps;
  if (getInitPageProps) {
    pageProps = await getInitPageProps(appContext.ctx);
  }

  return { currentUser: data.currentUser, pageProps };
};

export default AppComponent;
