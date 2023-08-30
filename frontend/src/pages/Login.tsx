import { Button, Flex, Heading, TextField, TextFieldSlot } from "@radix-ui/themes";
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from "../services/authService";
import { saveToken } from "../services/storage";
import {useNavigate} from 'react-router-dom';

type Inputs = {
    email: string,
    password: string
}

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const { email, password } = data;
        login(email, password).then(response => {
            const {status, data} = response;
            if(status === 200){
                saveToken(data.token);
                console.log(data.token)
                navigate('/todo');
            }else{
                alert('Email/password invalid');
            }
        })
    }

    return (
        <>
            <Heading className="text-center mb-8 font-bold text-xl">Faça o login</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex className="flex flex-col gap-4 px-4 py-10 bg-slate-800 rounded-lg">
                    <TextField.Root className="bg-white rounded-lg px-4">
                        <TextField.Input placeholder="email@email.com" className="py-2 w-full outline-none" type="email" {...register("email", { required: true })} />
                    </TextField.Root>
                    <TextField.Root className="bg-white rounded-lg px-4">
                        <TextField.Input placeholder="password" className="py-2 w-full outline-none" type="password" {...register("password", { required: true })} />
                    </TextField.Root>
                    <Button className="bg-white rounded-lg p-2 text-lg font-semibold" type="submit">
                        Login
                    </Button>
                </Flex>
            </form>
        </>
    );
}

export default Login;