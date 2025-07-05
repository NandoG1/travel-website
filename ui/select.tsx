import React from 'react'

function Select({data, className, placeholder, ...props}:any) {
  const defaultClassName = "text-slate-400 rounded-md w-2/3 outline-none p-2"
  
  return (
    <div>
        <select 
          className={className ? className : defaultClassName} 
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {data?.map((item:any, index:any) => {
            const element = item.element || item;
            const value = element?.value || element;
            const displayText = element?.text || element?.city || element;
            
            return (
              <option className='text-black' value={value} key={`${value}-${index}`}>
                  {displayText}
              </option>
            );
          })}
        </select>
    </div>
  )
}

export default Select