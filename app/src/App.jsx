import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import SearchResult from './components/SearchResults/SearchResult';

export const BASE_URL ="http://localhost:9000"
const App = () => {
  let [data,setDate] =useState(null);
  let [error,setError] =useState("");
  let [loading,setLoading] = useState(true);
  let [search,setSearch]=useState("");
  let [filter,setfiler] =useState(null);
  let [selected,setSelected]=useState(false);
  let[selectedButton,setSelectedButton]=useState("all");
  
  let buttonName =["all" , "breakfast" , "lunch" , "dinner"];
 
  useEffect(()=>{
    dataFetch();
  },[]);

  const dataFetch = async ()=>{
    try {
      const reponse = await fetch(BASE_URL);
      const datas = await reponse.json();
      setDate(datas)
      setLoading(false)
      setfiler(datas)
      
    } catch (error) {
      setError("data not fetch")
    }
  }
  if(error) return <h1>{error}</h1>
  if(loading) return <h1>Loading...</h1>
  
  const inputvalue = (e)=>{
    setSearch(e.target.value);
    if(search.length>0)
    {
      const filter = data.filter((items)=>{
        return items.name.toLowerCase().includes(search.toLowerCase())
      })
      setfiler(filter)
    }
  }

  const typeButton = (type) => {
    console.log("Clicked type:", type);
    if (type === 'all') {
      setfiler(data);
      setSelectedButton("all")
    } else {
      const filteredData = data.filter((item) =>
        item.type.toLowerCase().includes(type.toLowerCase())
      );
      setfiler(filteredData);
      setSelectedButton(type);
    }
  };
  
  return (
    <>
    <Container>
      <TopContainer>
        <div className="img">
          <img src="/public/logo.svg" alt="" />
        </div>
        <div className="search">
          <input type="text"
           onChange={inputvalue}
           value={search}
           placeholder='Search Food..'
           />
        </div>
      </TopContainer>
      <FilterContainer>
        {buttonName.map((item, i) => (
          <Button key={i}
          selected={item===selectedButton}
           onClick={() => typeButton(item)}>{item}</Button>
        ))}
      </FilterContainer>


    </Container>
    <SearchResult data ={filter} />
    </>
  )
}

export default App;

export const Container =styled.div`
  max-width: 1400px;
  margin:0 auto;
`
const TopContainer = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px; 
    min-height: 140px;
    .search{
      input{
        border: 1px solid red;
        color: white;
        border-radius: 5px;
        height: 40px;
        font-size: 16px;
        padding: 0 10px;
        background-color: #323334;
      &::placeholder{
        color: white;
      }
      }
      
    }
  
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-bottom: 30px;
`
export const Button =styled.div`
  color: white;
  background-color: ${(p) => p.selectedButton ? '#d30808' : '#FF4343'};
  border-radius: 5px;
  border: none;
  padding: 4px 16px;
  cursor: pointer;
  &:hover{
    background-color: #d30808;
  }
`




