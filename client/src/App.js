import React,{useEffect,useState} from "react"
import axios from "axios"

function App(){
const[breeds,setBreeds]=useState([])
const[selectedBreed,setSelectedBreed]=useState("")
const[cats,setCats]=useState([])
const[loading,setLoading]=useState(false)

async function fetchBreeds(){
setLoading(true)
let r=await axios.get("/api/breeds")
setBreeds(r.data)
setLoading(false)
}

async function fetchCats(breedId="",append=false){
setLoading(true)
try {
console.log(`Fetching cats with breedId: ${breedId}, limit: 9`);
let r = await axios.get("/api/images", {
params: {breedId, limit: 9}
})
console.log("Response received:", r.data);
let data = append ? [...cats, ...r.data] : r.data
setCats(data)
} catch (error) {
console.error("Error fetching cats:", error);
// Optionally show an error message to the user
} finally {
setLoading(false)
}
}

useEffect(()=>{
fetchBreeds()
fetchCats()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

function handleBreedChange(e){
setSelectedBreed(e.target.value)
fetchCats(e.target.value,false)
}

function loadMore(){
fetchCats(selectedBreed,true)
}

return(
<div style={{padding:"20px",fontFamily:"sans-serif"}}>
<h1>Random Cat Images Gallery</h1>
<div>
<select value={selectedBreed} onChange={handleBreedChange}>
<option value="">All Breeds</option>
{breeds.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
</select>
</div>
{loading&&<p>Loading...</p>}
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"10px",marginTop:"20px"}}>
{cats.map(c=><div key={c.id}><img src={c.url} alt="" style={{width:"100%"}}/></div>)}
</div>
<button onClick={loadMore} style={{marginTop:"20px"}}>Load More</button>
</div>
)
}

export default App
