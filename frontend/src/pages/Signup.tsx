import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";
import { signup } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormButton } from "../components/FormButton";
import { useState } from "react";

const schema = yup
  .object({
    name: yup.string().required("please enter your name"),
    email: yup
      .string()
      .required("please enter your email")
      .email("please provide a valid email"),
    password: yup.string().required("please enter your password"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Signup = () => {
  const [isPromise, setPromise] = useState(false);
  const [errorMessage, setMessage] = useState<undefined | string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      await schema.validate(formData);
      setMessage(undefined);
      const { name, email, password } = formData;
      setPromise(true);
      const response = await signup(name, email, password);

      response.status === 201 && navigate("/");
    } catch (err: any) {
      setMessage(err.message)
      setPromise(false);
    }
  };

  return (
    <Flex className="form">
      <Heading className="form__title">SIGN UP</Heading>
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Flex className="flex flex-col gap-4">
          <Form.FormField name="name">
            <Flex className="label">
              <Form.Label>Name: </Form.Label>
              <Form.Message className="error__message" match="valid">
                {errors.name?.message}
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <input className="input" type="text" {...register("name")} />
            </Form.Control>
          </Form.FormField>
          <Form.Field name="email">
            <Flex className="label">
              <Form.Label>Email: </Form.Label>
              <Form.Message className="error__message" match="valid">
                {errors.email?.message}
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <input className="input" {...register("email")} />
            </Form.Control>
          </Form.Field>
          <Form.Field name="password">
            <Flex className="label">
              <Form.Label>Password: </Form.Label>
              <Form.Message className="error__message" match="valid">
                {errors.password?.message}
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <input
                autoComplete="password"
                type="password"
                className="input"
                {...register("password")}
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <FormButton
              mainContent="Sign up"
              content="Registering"
              state={isPromise}
            />
          </Form.Submit>
          {errorMessage && <span className="text-red-600 font-semibold text-center">{errorMessage}</span>}
        </Flex>
      </Form.Root>
      <hr />
      <Box className="text-center">
        <Text className="dark:text-primary-dark">
          Already a user?{" "}
          <Link className="text-blue-600" to={"/"}>
            LOGIN
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Signup;
