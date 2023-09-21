import './Sidebar.css';
import Category from './Category/Category';
import Hamburger from 'hamburger-react'
import { useState } from 'react';


function Sidebar({handleQuery, categoryData ,handleCategoryQuery}) {
  const [sidebarIsShown , setSidebarIsShown] = useState(false)


  function toggleSidebar(){
    setSidebarIsShown(!sidebarIsShown)
  }

  return (
      <>
        <button className={sidebarIsShown?'sidebar-toggle show': 'sidebar-toggle'} onClick={toggleSidebar}><Hamburger size={20}/></button>
        <section className={sidebarIsShown?'sidebar show': 'sidebar'}>  
          <div className='sidebar-container'>
            <input type="text" placeholder='Search your item here' onChange={handleQuery} />
            <Category categoryData={categoryData}  handleQuery={handleCategoryQuery}/>
          </div>
        </section>
      </>
  )
}

export default Sidebar