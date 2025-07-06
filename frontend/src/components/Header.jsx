import React from 'react'
import {assets} from '../assets/assets'
const Header = () => {
  return (
    <div>
        <Image src={assets.header_img} alt='' w="36" h="36" mb={'6'} />
        <H1>Hey Developer! <Image src={assets.hand_wave} /></H1>
    </div>
  )
}

export default Header