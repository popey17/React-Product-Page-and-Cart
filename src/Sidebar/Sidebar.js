import './Sidebar.css';
import Category from './Category/Category';

function Sidebar({handleQuery}) {

  return (
      <>
        <section className="sidebar">
          <div className='sidebar-container'>
            <input type="text" placeholder='Search your item here' onChange={handleQuery} />
            <Category  handleQuery={handleQuery}/>
          </div>
        </section>
      </>
  )
}

export default Sidebar