import React from 'react'
import Header from '../components/header.jsx'
import Steps from '../components/steps.jsx'
import Description from '../components/description.jsx'
import Testimonials from '../components/testimonials.jsx'
import GenerateBtn from '../components/generateBtn.jsx'

const home = () => {
  return (
    <div>
        <Header/>
        <Steps/>
        <Description/>
        <Testimonials/>
        <GenerateBtn/>
    </div>
  )
}

export default home