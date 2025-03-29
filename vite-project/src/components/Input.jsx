import React, { forwardRef, useId } from 'react';
import '../App.css'

const Input = forwardRef(({
  label,
  type = "text",
  className = "",
  ...props
}, ref) => {
  const id = useId();
  return (
    <div className='input-field'>
      {label && 
        <label htmlFor={id} className="label">
          {label}
        </label>  
      }

      <input 
        type={type}
        className='input'
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  )
})

export default Input;
 

// import React, { useId, forwardRef } from 'react';

// const Input = forwardRef(({
//     label,
//     type = 'text',
//     className = '',
//     ...props
// }, ref) => {
//     const id = useId()
//     return (
//         <div className='w-full'>
//             {label && 
//                 <label 
//                     className={`block mb-1 ${className}`}
//                     htmlFor={id}    
//                 >
//                     {label}
//                 </label>
//             }

//             <input 
//                 type= {type} 
//                 className= {`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
//                 ref = {ref}
//                 {...props}
//                 id= {id}
//             />
//         </div>
//     )
// })

// export default Input