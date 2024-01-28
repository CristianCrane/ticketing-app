import { useDisclosure } from "@mantine/hooks";
import {
  Anchor,
  AppShell,
  Burger,
  Button,
  Group,
  Skeleton,
} from "@mantine/core";
import { PropsWithChildren } from "react";
import { CurrentUser } from "../hooks/useCurrentUser";
import Link from "next/link";
import { useRouter } from "next/router";

type AppLayoutProps = { currentUser: CurrentUser } & PropsWithChildren;

export function AppLayout({ currentUser, children }: AppLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Anchor component={Link} href="/">
              GitTix
            </Anchor>
          </Group>
          <Group justify="flex-end">
            {currentUser ? (
              <Button
                variant="subtle"
                onClick={() => router.push("/auth/signout")}
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Button
                  variant="subtle"
                  onClick={() => router.push("/auth/signup")}
                >
                  Sign up
                </Button>
                <Button
                  variant="subtle"
                  onClick={() => router.push("/auth/signin")}
                >
                  Sign in
                </Button>
              </>
            )}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
