import React from 'react'
import Cource from '../../components/Section/Course'
import UserHeader from '../../components/Headers/UserHeader'
function Course() {
  return (
    <div>
      <UserHeader pageIndex={3}/>
        <Cource/>
    </div>
  )
}

export default Course