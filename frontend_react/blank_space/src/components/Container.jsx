import React from 'react'

const Container = ({children}) => {
  return (
    <div className="container shadow" id="content">{children}</div>
  )
}

export default Container