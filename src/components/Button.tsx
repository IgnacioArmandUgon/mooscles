import React from 'react'

const Button = ({ children }) => {
    return (
        <button className='active:ring-0'>{children}</button>
    )
}

export default Button