
function Input({name,title,handleQuery,value}) {
  return (
    <label  className="sidebar-label-container">
          <input type="radio" name={name} value={value} onClick={handleQuery}/>
          <span className='check'></span>{title}
        </label>
  )
}

export default Input