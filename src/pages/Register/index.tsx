import { Button, Input, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import AnimatedWrapper from "../../animations/AnimatedWrapper";
import animation from "../../assets/register_queue_animation.svg";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useUserStore } from "../../store/user";
import { useEffect, useState } from "react";

function Register() {
    const { register } = useAuthentication()
    const { isUserLogged} = useUserStore()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    
    useEffect(() => {
       if(isUserLogged) {
        navigate("/home")
       } 
    })

    const formik = useFormik({
        validateOnMount : true,
        initialValues : {
            name : "",
            email : "",
            password : "",
        },
        validationSchema : Yup.object({
            name : Yup.string()
                .required("Nome deve ser preenchido")
                .min(3, "Nome muito curto"),
            email : Yup.string()
                .required("Email deve ser preenchido")
                .email("Email inválido"),
            password : Yup.string()
                .required("Senha deve ser preenchida")
                .min(6, "A senha deve ter mais que 6 caracteres")
        }),
        onSubmit : async (values) => {
            setIsLoading(true)
            const response = await register(values)
            if(response == "already_exists") {
                setIsLoading(false)
                return messageApi.error("Esse usuário já existe")
            }
            if(response == "network_error") {
                setIsLoading(false)
                return messageApi.error("Erro de servidor")
            }
            setIsLoading(false)
            messageApi.success("Registrado com sucesso!")
            setTimeout(() => {
                navigate("/home")
            }, 1000)
        },
        
    })

    return (
        <AnimatedWrapper>
            {contextHolder}
            <img src={animation} className="mx-auto w-64 lg:w-80"/>
            <h1 className="text-3xl font-semibold px-4 lg:mx-72 lg:font-bold">Crie sua conta</h1>
            <p className="lg:mx-72 px-4 text-sm lg:text-base text-gray-600">Assim o aplicativo pode salvar suas informações, para que sempre que entrar no site, seus aparelhos sejam exibidos.</p>
            <form onSubmit={formik.handleSubmit} className="flex flex-col mt-4 px-4 gap-3 lg:mx-72">
                <div>
                    <p>Nome</p>
                    <Input 
                        type="text" 
                        name="name" 
                        value={formik.values.name} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        size="large"
                    />
                    {formik.touched.name && formik.errors.name ?
                        <small className="font-medium text-red-500">{formik.errors.name}</small> : null}
                </div>

                <div>
                    <p>Email</p>
                    <Input 
                        type="email" 
                        name="email" 
                        value={formik.values.email} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        size="large" 
                    />
                    {formik.touched.email && formik.errors.email ?
                        <small className="font-medium text-red-500">{formik.errors.email}</small> : null}
                </div>

                <div>
                    <p>Senha</p>
                    <Input 
                        type="password" 
                        name="password" 
                        value={formik.values.password} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        size="large" 
                    />
                    {formik.touched.password && formik.errors.password ?
                        <small className="font-medium text-red-500">{formik.errors.password}</small> : null}
                </div>

                <Button 
                    htmlType="submit" 
                    type="primary" 
                    className="bg-colorPrimary mt-2" 
                    size="large"
                    disabled={!formik.isValid}
                    loading={isLoading}
                    >Registrar
                </Button>
            </form>
            <p className="text-sm px-4 mt-3 lg:mx-72">
                Já tem uma conta? <Link to="/login" className="text-blue-600 font-semibold">Entre</Link>
            </p>
        </AnimatedWrapper>
    )
}

export default Register;