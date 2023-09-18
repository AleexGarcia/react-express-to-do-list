import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "../services/authService";
import { saveToken } from "../services/storage";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FormButton } from "../components/FormButton";

const schema = yup
  .object({
    email: yup
      .string()
      .required("please enter your email")
      .email("please provide a valid email"),
    password: yup.string().required("please enter your password"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [isNotValid, setValid] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AppContext);
  const [isPromise, setPromise] = useState(false);
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      await schema.validate(formData);
      const { email, password } = formData;
      setValid(false);
      setPromise(true);
      const response = await login(email, password);
      if (response.status === 200) {
        saveToken(response.data.token);
        setIsLoggedIn(true);
        navigate("/todo");
      }
    } catch (error: any) {
      setValid(true);
      setPromise(false);
    }
  };

  return (
    <Flex
      className="
      form
      "
    >
      <Heading className="form__title">SIGN IN</Heading>
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Flex className="flex flex-col gap-4 w-full">
          <Form.Field name="email">
            <Flex className="label">
              <Form.Label>Email: </Form.Label>
              <Form.Message className="error__message " match="valid">
                {errors.email?.message}
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <input
                className="input"
                autoComplete="username"
                {...register("email")}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="password">
            <Flex className="label">
              <Form.Label>Password: </Form.Label>
              <Form.Message className="error__message " match="valid">
                {errors.password?.message}
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <input
                autoComplete="current-password"
                type="password"
                className="input"
                {...register("password")}
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <FormButton mainContent="Login" content="Logging" state = {isPromise}/>
          </Form.Submit>
        </Flex>
        {isNotValid && (
          <Box className="mt-2 text-center error__message">
            <span>Invalid email / password</span>
          </Box>
        )}
      </Form.Root>
      <hr />
      <Box className="text-center">
        <Text className="dark:text-primary-dark">
          Need an account?{" "}
          <Link className="text-blue-600" to={"/signup"}>
            SIGN UP
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
