import Input from '../../components/Input'
import './Category.css'

function Category({handleQuery,categoryData}) {


  return (
    <>
      <h2 className='sidebar-title'>Category</h2>
      <div>
        <Input title='All' name='category' value='' handleQuery={handleQuery} />
        {categoryData.map(category=>(
          <Input key={category.id} title={category.name} name="category" value={category.name} handleQuery={handleQuery}/>
        ))}
      </div>
    </>
  )
}

export default Category