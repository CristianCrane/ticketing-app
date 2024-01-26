import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useTicketingApiErrors } from "../../hooks/useTicketingApiErrors";
import Router from "next/router";

const schema = z.object({
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});
type FormValues = z.infer<typeof schema>;

export default function Signup() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const { mutate, isPending, error } = useSubmit();

  const handleSubmit = (formValues: FormValues) => {
    mutate(formValues);
  };

  const signUpError = useTicketingApiErrors(error);

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Email"
            withAsterisk
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            withAsterisk
            {...form.getInputProps("password")}
          />
          {signUpError}
          <Button type="submit" loading={isPending}>
            Sign in
          </Button>
        </Stack>
      </form>
    </div>
  );
}

const useSubmit = () => {
  return useMutation({
    mutationFn: (formValues: FormValues) =>
      axios.post("/api/users/signin", formValues),
    onSuccess: () => Router.push("/"),
  });
};
