import './Sidebar.css';
import Category from './Category/Category';
import Hamburger from 'hamburger-react'
import { useState, useEffect, useRef  } from 'react';


function Sidebar({handleQuery, categoryData ,handleCategoryQuery}) {
  const [sidebarIsShown , setSidebarIsShown] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  function toggleSidebar(){
    setSidebarIsShown(!sidebarIsShown)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Clicked outside of the sidebar, so close it
        setSidebarIsShown(!sidebarIsShown);
        setOpen(!isOpen)
      }
    }

    if (sidebarIsShown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarIsShown, isOpen]);


  return (
      <>
        <section className={sidebarIsShown?'sidebar show': 'sidebar'} ref={sidebarRef}>  
        <button className='sidebar-toggle' onClick={toggleSidebar}><Hamburger toggled={isOpen} toggle={setOpen} size={20}/></button>
          <div className='sidebar-container'>
            <input type="text" placeholder='Search your item here' onChange={handleQuery} />
            <Category categoryData={categoryData}  handleQuery={handleCategoryQuery}/>
          </div>
        </section>
      </>
  )
}

export default Sidebar