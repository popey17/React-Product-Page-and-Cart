import Input from '../../components/Input'
import { useState, useEffect } from "react";
import './Category.css'

function Category({handleQuery,categoryData}) {

  const Token = '1|laravel_sanctum_CoMODX97Cx3HxqDLo08tA9oZDCRcmO9uHFuTCa5v2e12f732';



  return (
    <>
      <h2 className='sidebar-title'>Category</h2>
      <div>
        <Input title='All' name='category' value='' handleQuery={handleQuery} />
        {categoryData.map(category=>(
          <Input key={category.id} title={category.name} name="category" value={category.name} handleQuery={handleQuery}/>
          // <Input type="radio" key={category.id} name={category.name} title={category.name} value={category.name}/>
        ))}
      </div>
    </>
  )
}

export default Category