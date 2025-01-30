import React from 'react'
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <div>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Home page</title>
    <link rel="canonical" />
    <meta
    name="description"
    content="Ventre produit"
  />
</Helmet>
        <h1>MERN app</h1>
    </div>
  )
}

export default Home
