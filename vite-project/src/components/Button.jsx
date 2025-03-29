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

























// import React from 'react'

// function Button({
//     children,
//     type = "button",
//     bgColor = 'bg-blue-600',
//     textColor = 'text-white',
//     className = '',
//     ...props
// }) {
//   return (
//     <button className= {`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}` }
//     {...props}>
    
//         {children}
        
//     </button>
//   )
// }

// export default Button