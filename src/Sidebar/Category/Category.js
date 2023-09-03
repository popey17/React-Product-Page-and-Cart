import Input from '../../components/Input'
import { useState, useEffect } from "react";
import './Category.css'

function Category({handleQuery}) {
  const [categoryData, setCategoryData] = useState([]);
  const Token = '1|laravel_sanctum_CoMODX97Cx3HxqDLo08tA9oZDCRcmO9uHFuTCa5v2e12f732';

  useEffect(()=>{
    fetchData()
   },[])

   async function fetchData() {
    try{
      const response = await fetch ('http://items.aura.biocaremm.com/api/categories', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Token}`,
        },
      });
  

      if(!response) {
        throw new Error('error fetching data');
      }

      const responseData = await response.json();
      setCategoryData (responseData);

    }catch (error) {
      console.error(error);
      setCategoryData ([]);
    }
  }

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