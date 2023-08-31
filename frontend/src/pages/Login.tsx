import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import * as Form from '@radix-ui/react-form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from "../services/authService";
import { saveToken } from "../services/storage";
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";


const schema = yup.object({
    email: yup.
        string().
        required('please enter your email').
        email('please provide a valid email'),
    password: yup.
        string().
        required('please enter your password')
});

type FormData = yup.InferType<typeof schema>;

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const [isNotValid, setValid] = useState(false);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = async (formData) => {
        try {
            await schema.validate(formData);
            const { email, password } = formData;
            const response = await login(email, password);

            if (response.status === 200) {
                saveToken(response.data.token);
                navigate('/todo');
            }

        } catch (error: any) {
            setValid(true);
        }
    }

    return (
        <Flex className="flex flex-col gap-8">
            <Heading className="text-center font-bold text-xl">Faça o login</Heading>
            <Form.Root onSubmit={handleSubmit(onSubmit)}>
                <Flex className="flex flex-col gap-4 px-4 py-10 bg-slate-800 rounded-lg">
                    <Form.Field name="email">
                        <Flex className="text-white flex flex-row justify-between mb-2">
                            <Form.Label>Email: </Form.Label>
                            <Form.Message match={() => !!errors.password}>{errors.email?.message}</Form.Message>
                        </Flex>
                        <Form.Control asChild>
                            <input className="w-full px-1 py-2"{...register("email")} />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field name="password">
                        <Flex className="text-white  flex flex-row justify-between mb-2">
                            <Form.Label>Password: </Form.Label>
                            <Form.Message match={() => !!errors.password}>{errors.password?.message}</Form.Message>
                        </Flex>
                        <Form.Control asChild>
                            <input type="password" className="w-full px-1 py-2" {...register("password")} />
                        </Form.Control>
                    </Form.Field>
                    <Form.Submit asChild>
                        <Button className="bg-white rounded-lg p-2 text-lg font-semibold" type="submit">
                            Login
                        </Button>
                    </Form.Submit>
                </Flex>
                {isNotValid && 
                <Box className="mt-2 text-center">
                    <span>Invalid email / password</span>
                </Box>
                }
            </Form.Root >
            <hr />
            <Box className="text-center">
                <Text className="">Need an account? <Link to={'/signup'}>SIGN UP</Link></Text>
            </Box>
        </Flex>
    );
}

export default Login;