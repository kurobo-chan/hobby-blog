import React from "react"

import Header from "../components/header"
import Footer from "../components/footer"
import Aside from "../components/aside"
import "./layout.css"
import "@fontsource/m-plus-1p"
import "@fontsource/montserrat"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

export default function Home({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Aside />
      <Footer />
    </div>
  )
}
