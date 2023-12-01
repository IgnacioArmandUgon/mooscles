import React from 'react'
import { Navbar } from './../components/Navbar'
const PageLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default PageLayout