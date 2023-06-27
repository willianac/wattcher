import { Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import AnimatedWrapper from "../../animations/AnimatedWrapper";
import animation from "../../assets/login_animation.svg"
import { useAuthentication } from "../../hooks/useAuthentication";
import { useUserStore } from "../../store/user";
import { useEffect, useState } from "react";

function Login() {
    const { login } = useAuthentication()
    const { isUserLogged } = useUserStore()
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
            email : "",
            password : ""
        },
        validationSchema : Yup.object({
            email : Yup.string()
                .required("Email deve ser preenchido")
                .email("Email inválido"),
            password : Yup.string()
                .min(6, "A senha deve ter mais que 6 caracteres")
                .required("Senha deve ser preenchida")
        }),
        onSubmit : async (values) => {
            setIsLoading(true)
            const response = await login(values)
            if(response === "wrong_credentials") {
                setIsLoading(false)
                return messageApi.error("Credenciais inválidas")
            }
            if(response === "network_error") {
                setIsLoading(false)
                return messageApi.error("Erro de servidor")
            }
            if(response === "unexpected error") {
                setIsLoading(false)
                return messageApi.error("Erro inesperado")
            }
            setIsLoading(false)
            messageApi.success("Autenticado com sucesso!")
            setTimeout(() => {
                navigate("/home")
            }, 1000)
        }
    })

    return (
        <AnimatedWrapper>
            {contextHolder}
            <img src={animation} className="mx-auto w-64 lg:w-80" />
            <a href="https://storyset.com/nature" className="text-xs px-4 text-gray-300 lg:mx-72">Nature illustrations by Storyset</a>
            <h1 className="text-3xl font-semibold px-4 lg:mx-72">Preencha todos os campos</h1>
            <form className="mt-4 px-4 flex flex-col gap-3 lg:mx-72" onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input 
                        type="email" 
                        name="email"
                        size="large" 
                        onChange={formik.handleChange} 
                        value={formik.values.email} 
                        onBlur={formik.handleBlur}
                        data-testid="email"
                    />
                    {formik.touched.email && 
                        formik.errors.email ? 
                        <small className="font-medium text-red-500">{formik.errors.email}</small> : null}
                </div>

                <div>
                    <label htmlFor="password">Senha</label> 
                    <Input 
                        type="password" 
                        name="password" 
                        size="large"
                        onChange={formik.handleChange} 
                        value={formik.values.password} 
                        onBlur={formik.handleBlur}
                        data-testid="password"
                    />
                    {formik.touched.password && 
                        formik.errors.password ? 
                        <small className="font-medium text-red-500">{formik.errors.password}</small> : null}
                </div>

                <Button 
                    type="primary"
                    size="large" 
                    htmlType="submit" 
                    className="bg-colorPrimary mt-2"
                    disabled={!formik.isValid}
                    loading={isLoading}
                    >Entrar
                </Button>
            </form>
            <p className="px-4 text-sm mt-3 lg:mx-72">
                Não tem uma conta? <Link to="/register" className="text-blue-600">Cadastre-se</Link> 
            </p>
        </AnimatedWrapper>
    )
}

export default Login;