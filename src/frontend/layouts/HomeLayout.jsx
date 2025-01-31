import Slider from "../components/common/Slider";
import React from 'react'
import CategoryLayout from "./CategoryLayout";
const HomeLayout = () => {
  return (
    <div className="mt-8">
      <Slider></Slider>
      <CategoryLayout />
    </div>
  )
}

export default HomeLayout
