import './Sidebar.css';
import Category from './Category/Category';

function Sidebar({handleQuery, categoryData}) {

  return (
      <>
        <section className="sidebar">
          <div className='sidebar-container'>
            <input type="text" placeholder='Search your item here' onChange={handleQuery} />
            <Category categoryData={categoryData}  handleQuery={handleQuery}/>
          </div>
        </section>
      </>
  )
}

export default Sidebar