import './Sidebar.css';
import Category from './Category/Category';

function Sidebar({handleClick}) {

  return (
      <>
        <section className="sidebar">
          <div className='sidebar-container'>
            <input type="text" placeholder='find item' />
            <Category  handleClick={handleClick}/>
          </div>
        </section>
      </>
  )
}

export default Sidebar