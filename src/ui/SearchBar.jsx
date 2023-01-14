import TextField from '@mui/material/TextField';
import { useState } from 'react';

export const SearchBar = () =>{
    const list=["apple","a","app","asd","a123","132","bef","zfg"];
    const [searchList,setSearchList]=useState([])

    var newList=[]
    const updateList=(value)=>{
        var wordChar=value.split('')
        console.log(wordChar)
        list.map((item)=>{
            var itemChar=item.split('')
            if(itemChar[0]==wordChar[0])
            {
                newList.push(item)
            }
            setSearchList(newList)
        })
    }

    return(
        <div>
            <TextField width="10" id="searchBar" onChange={()=>{updateList(searchBar.value)}}/>
            {searchList.map((item)=>{return <div>{item}</div>})}
        </div>
    )
}