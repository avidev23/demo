import React from 'react'
import {useState,useEffect} from 'react'

function UserList() {
    const [list,setList]=useState([])
    const [page,setPage] = useState(1)
    const [newList,setNewList]=useState([])
    
    const [query,setQuery]  = useState('')

    const pages=[1,2]

    async function getData() {
        const data = await fetch("https://reqres.in/api/users");
        const json = await data.json();
        console.log(json.data)

        setList(json.data)
        setNewList(json.data)
        console.log(list)
    }


    function handleClick(p) {
        setPage(p)
        
    }

    const handleChange =(e) =>{
        setQuery(e.target.value)
        const results = list.filter(posts =>{
            if(e.target.value ==="") return list
            return posts.first_name.toLowerCase().includes(e.target.value.toLowerCase())
        })

        



    }

    const handleDelete = (x) =>{
    alert('Are u sure you waana delete this?')  
    newList.filter(l => {return l.first_name !== x})

    setList(newList)
  }


    useEffect(()=>{
        getData()
    },[])
    
  return (
    <div>

        <input type="text" placeholder="Searchtext" name="search"  value={query} />

           {list.slice((page-1)*3,(page)*3).map(l => (
            <div>

                {l.first_name}
                {l.last_name}
                <img src={l.avatar} alt="img" />

                <button onClick={()=>handleDelete(l.first_name)}>DEL</button>
                </div>
           ))}

           {pages.map(p => (
            <button onClick={()=>{handleClick(p)}}>{p}</button>
           ))}

    </div>
  )
}

export default UserList