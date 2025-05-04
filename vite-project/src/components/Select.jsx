import React, {forwardRef, useId} from 'react'

const Select = forwardRef(({
  options,
  label,
  className = "",
  ...props
}, ref) => {
  const id = useId();
  
  return(
    <div>
      {label && <label htmlFor={id}>
          {label}
        </label>}

      <select {...props} id={id} ref={ref} className='select'>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
})

export default Select