import { useRouteError, Link } from "react-router-dom";
import { Button } from "antd";

import Footer from "../../components/Footer";
import "./error.css"

function Error() {
  const error = useRouteError() as unknown

  return (
    <div className="flex flex-col h-full bg-colorPrimary gap-2">
      <span className="material-symbols-outlined text-white text-9xl mx-auto mt-28">
        bolt
      </span>
      {error.status == 404 ?
        <h1 className="text-4xl font-bold text-center mt-16">Essa página não existe!</h1> :
        <h1 className="text-4xl font-bold text-center mt-16">{error.statusText || error.message}</h1>  
      }
      <div className="mx-auto">
        <Link to="/">
          <Button type="link" size="large" >Voltar</Button>
        </Link>
      </div>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  )
}

export default Error;