import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/header/Header.jsx' 
import Footer from './components/footer/Footer.jsx' 

import './GlobalStyle/globalStyle.scss'
export default function App(){

  
  return(
    <section>
      <Header></Header>
      <Footer></Footer>
    </section>
  )
}