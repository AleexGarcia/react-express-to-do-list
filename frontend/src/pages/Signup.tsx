import { Button, Flex, Heading, TextField } from "@radix-ui/themes";
import { SubmitHandler, useForm } from 'react-hook-form';
import { signup } from "../services/authService";
import {useNavigate} from 'react-router-dom'
type Inputs = {
    name: string,
    email: string,
    password: string
}

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const {name ,email, password } = data;
         signup(name,email, password).then(response => {
            (response.status === 201) ? navigate('/') : alert('Bad request!'); 
         })

    }

    return (
        <>
            <Heading className="text-center mb-8 font-bold text-xl">Faça o cadastro</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex className="flex flex-col gap-4 px-4 py-10 bg-slate-800 rounded-lg">
                    <TextField.Root className="bg-white rounded-lg px-4">
                        <TextField.Input placeholder="name" className="py-2 w-full outline-none" type="text" {...register("name", { required: true })} />
                    </TextField.Root>
                    <TextField.Root className="bg-white rounded-lg px-4">
                        <TextField.Input placeholder="email@email.com" className="py-2 w-full outline-none" type="email" {...register("email", { required: true })} />
                    </TextField.Root>
                    <TextField.Root className="bg-white rounded-lg px-4">
                        <TextField.Input placeholder="password" className="py-2 w-full outline-none" type="password" {...register("password", { required: true })} />
                    </TextField.Root>
                    <Button className="bg-white rounded-lg p-2 text-lg font-semibold" type="submit">
                        SIGN UP
                    </Button>
                </Flex>
            </form>
        </>
    );
}

export default Signup;