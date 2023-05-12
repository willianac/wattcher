import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import AnimatedWrapper from "../../animations/AnimatedWrapper";
import animation from "../../assets/login_animation.svg"

function Login() {
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
        onSubmit : (values) => {
            console.log(values)
        }
    })

    return (
        
            <AnimatedWrapper>
                <img src={animation} className="mx-auto w-64 lg:w-80" />
                <a href="https://storyset.com/nature" className="text-xs px-4 text-gray-300 lg:mx-72">Nature illustrations by Storyset</a>
                <h1 className="text-3xl font-semibold px-4 lg:mx-72">Preencha todos os campos</h1>
                <form className="mt-4 px-4 flex flex-col gap-3 lg:mx-72" onSubmit={formik.handleSubmit}>
                    <div>
                        <p>Email</p>
                        <Input 
                            type="email" 
                            name="email"
                            size="large" 
                            onChange={formik.handleChange} 
                            value={formik.values.email} 
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && 
                            formik.errors.email ? 
                            <small className="font-medium text-red-500">{formik.errors.email}</small> : null}
                    </div>

                    <div>
                        <p>Senha</p>    
                        <Input 
                            type="password" 
                            name="password" 
                            size="large"
                            onChange={formik.handleChange} 
                            value={formik.values.password} 
                            onBlur={formik.handleBlur}
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
                        >Enviar
                    </Button>
                </form>
                <p className="px-4 text-sm mt-3 lg:mx-72">
                    Não tem uma conta? <Link to="/cadastrar" className="text-blue-600">Cadastre-se</Link> 
                </p>
            </AnimatedWrapper>
        
    )
}

export default Login;