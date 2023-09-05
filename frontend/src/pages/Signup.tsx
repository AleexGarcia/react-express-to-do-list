import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";
import { signup } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required("please enter your name"),
  email: yup
    .string()
    .required("please enter your email")
    .email("please provide a valid email"),
  password: yup.string().required("please enter your password"),
});

type FormData = yup.InferType<typeof schema>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    
    try{
        await schema.validate(formData);
        const { name, email, password } = formData;
        const response = await signup(name, email, password)
        
        response.status === 201 && navigate("/") 
     
    }catch(err){
        console.log(err);
    }
    
  };

  return (
    <Flex className="max-w-lg mx-auto flex flex-col gap-2 px-4 py-10 items-center bg-slate-800 rounded-lg">
      <Heading className="text-center font-bold text-xl">SIGN UP</Heading>
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Flex className="flex flex-col gap-4 px-4 py-10 bg-slate-800 rounded-lg sm:min-w-350">
          <Form.FormField name="name">
            <Flex className="text-white flex flex-row justify-between mb-2">
              <Form.Label>Name: </Form.Label>
              <Form.Message match={() => !!errors.name}>
                {errors.name?.message}
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <input
                className="py-2 w-full outline-none"
                type="text"
                {...register("name")}
              />
            </Form.Control>
          </Form.FormField>
          <Form.Field name="email">
            <Flex className="text-white flex flex-row justify-between mb-2">
              <Form.Label>Email: </Form.Label>
              <Form.Message match={() => !!errors.password}>
                {errors.email?.message}
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <input className="w-full px-1 py-2" {...register("email")} />
            </Form.Control>
          </Form.Field>
          <Form.Field name="password">
            <Flex className="text-white  flex flex-row justify-between mb-2">
              <Form.Label>Password: </Form.Label>
              <Form.Message match={() => !!errors.password}>
                {errors.password?.message}
              </Form.Message>
            </Flex>
            <Form.Control asChild>
              <input
                type="password"
                className="w-full px-1 py-2"
                {...register("password")}
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <Button
              className="bg-white rounded-lg p-2 text-lg font-semibold"
              type="submit"
            >
              SIGN UP
            </Button>
          </Form.Submit>
        </Flex>
      </Form.Root>
      <hr />
      <Box className="text-center">
        <Text className="">
          Already a user? <Link to={"/"}>LOGIN</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Signup;
