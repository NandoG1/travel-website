import React from 'react'

function Select({data, register, className}:any) {
  const defaultClassName = "text-slate-400 rounded-md w-2/3 outline-none p-2"
  return (
    <div>
        <select name="" id="" className={className ? className : defaultClassName} {...register}>
          {data?.map(({element} : any) => (
              <option value={element.value} key={element.value}>
                  {element.text ? element.text : element.city}
              </option>
          ))}
        </select>
    </div>
  )
}

export default Select