import {
  Alert,
  Button,
  List,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

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

  const { mutate, isPending, isError, error } = useSubmit();

  const handleSubmit = (formValues: FormValues) => {
    mutate(formValues);
  };

  const signInError =
    error instanceof AxiosError ? (error.response?.data as SigninError) : null;

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
          {signInError && (
            <Alert color="red" title="Oops...">
              <List>
                {signInError.errors.map((err) => (
                  <List.Item>{err.message}</List.Item>
                ))}
              </List>
            </Alert>
          )}
          <Button type="submit" loading={isPending}>
            Sign in
          </Button>
        </Stack>
      </form>
    </div>
  );
}

const useSubmit = () => {
  return useMutation<SigninResponse, SigninError, FormValues>({
    mutationFn: (formValues) => axios.post("/api/users/signin", formValues),
    onSuccess: (data) => {
      alert(JSON.stringify(data, null, 2));
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

type SigninResponse = { email: "string"; id: "string" };
type SigninError = { errors: { message: string; field?: string }[] };
