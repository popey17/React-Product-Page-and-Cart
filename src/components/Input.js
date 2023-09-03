
function Input({name,title,handleClick}) {
  return (
    <label  className="sidebar-label-container">
          <input type="radio" name={name} value={title} onChange={handleClick}/>
          <span className='check'></span>{title}
        </label>
  )
}

export default Input