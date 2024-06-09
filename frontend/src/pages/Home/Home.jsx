import { useState } from "react"
import Explore from "../../components/Exoplore/Explore"
import Header from "../../components/Header/Header"
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay"
import AppDownload from "../../components/appDownload/AppDownload"

const Home = () => {
  const [category, setCategory] = useState("All")

  return (
    <div>
      <Header/>
      <Explore category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home