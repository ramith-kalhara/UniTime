import React from 'react'
import Room from '../../components/Section/Room'
import BookRoom from '../../components/Section/BookRoom'
import UserHeader from '../../components/Headers/UserHeader'

function Rooms() {
  return (
    <div>
        <UserHeader pageIndex={0}/>
        <Room/>
        <BookRoom/>
    </div>
  )
}

export default Rooms