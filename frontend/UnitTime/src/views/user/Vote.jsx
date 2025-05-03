import React from 'react'
import VoteSlider from '../../components/Section/VoteSlider'
import VoteBar from '../../components/Section/VoteBar'
import UserHeader from '../../components/Headers/UserHeader'

function Vote() {
  return (
    <div>
        <UserHeader pageIndex={7}/>
     
        <VoteBar/>
        {/* <VoteSlider/> */}

    </div>
  )
}

export default Vote