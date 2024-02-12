import React from "react"
import Style from "./layoutlogin.module.scss"

interface ILayoutLoginProps {
  children: React.ReactNode
}

const LayoutLogin = ({ children }: ILayoutLoginProps) => {
  return <div className={Style.login}>{children}</div>
}

export default LayoutLogin
