import React from 'react'
import "./loader.css"


function Loader(data) {
    const [loader, setLoader] = React.useState(false)
    React.useEffect(() => { setLoader(data) }, [loader])
  return (
    <>{loader ?
        <div className="loader-box" >
            <span className="loader"></span>
        </div> : null
    }</>
  )
}

export default Loader