import { z } from "zod";
import { Alert, List } from "@mantine/core";
import { AxiosError } from "axios";

export const useTicketingApiErrors = (apiError: unknown) => {
  let ticketingApiErrors = null;

  const parsedError =
    apiError instanceof AxiosError
      ? schema.safeParse(apiError.response?.data)
      : null;

  if (parsedError?.success) {
    ticketingApiErrors = (
      <Alert color="red" title="Oops...">
        <List>
          {parsedError.data.errors.map((err) => (
            <List.Item>{err.message}</List.Item>
          ))}
        </List>
      </Alert>
    );
  }

  return ticketingApiErrors;
};

const schema = z.object({
  errors: z.array(
    z.object({
      message: z.string(),
      field: z.string().optional(),
    }),
  ),
});
export type TicketingApiErrors = z.infer<typeof schema>;
