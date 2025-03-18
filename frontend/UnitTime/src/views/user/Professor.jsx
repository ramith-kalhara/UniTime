import React from 'react'
import Professors from '../../components/Section/Professors'
import UserHeader from '../../components/Headers/UserHeader'

function Professor() {
  return (
    <div>
        <UserHeader pageIndex={2}/>
        <Professors/>
    </div>
  )
}

export default Professor