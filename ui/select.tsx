import React from 'react'

function Select({data, register, className}:any) {
  const defaultClassName = "text-slate-400 rounded-md w-2/3 outline-none p-2"
  return (
    <div>
        <select name="" id="" className={className ? className : defaultClassName} {...register}>
          {data?.map((item : any, index: number) => {
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

export default Select