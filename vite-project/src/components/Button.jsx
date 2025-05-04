import React, { Children } from 'react'

function Button({
    type = "button",
    children,
    ...props
}) {
  return (
    <button type= {type} {...props} className='button'>
        {children}
    </button>
  )
}

export default Button