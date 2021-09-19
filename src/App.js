import React,{useEffect,useState} from 'react'
import './App.css';
import Recepie from './Recepie'

const App = () => {

  const APP_ID="89c0dbad"
  const APP_KEY="4ccb1ec00c5ab11b3d18914d487d38b7"

  const [recepies,setRecepies] = useState([])
  const [search,setSearch] = useState('')
  const [query,setQuery] = useState('chicken')
  
  useEffect(()=>{
    getRecepies()
  },[query])

   const getRecepies = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      const data = await response.json()
      setRecepies(data.hits)
      console.log(data.hits)
    } 
 
    const updateSearch = (e) => {
      setSearch(e.target.value) 
      console.log(`Searched item is ${search}`)
    }

    const getSearch = (e) => {
        e.preventDefault()
        setQuery(search)
        setSearch('')
    }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className = "search-bar" type="text" value={search} onChange={updateSearch} />
        <button className = "search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
          {recepies.map(recepie=>(
            <Recepie key={recepie.recipe.label} title={recepie.recipe.label} calories={recepie.recipe.calories} image={recepie.recipe.image} ingredients={recepie.recipe.ingredients}/>
          ))} 
      </div>
      
      
    </div>
  )
}

export default App;
