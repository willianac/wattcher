import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from "antd"
import { RouterProvider } from 'react-router-dom'
import './index.css'
import routes from './router.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={{token: {colorPrimary : "#00DD00"}}}>
      <RouterProvider router={routes}/>
    </ConfigProvider>
  </React.StrictMode>,
)
