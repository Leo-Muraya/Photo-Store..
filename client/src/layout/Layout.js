//Importing relevant files
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Outlet} from 'react-router-dom'

export default function Layout() {
  return (
    // Defining the outelet plus navbar and footer positioning.
    <div>
        <NavBar/>
        <div id="outlet">
           <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}