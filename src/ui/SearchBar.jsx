import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { setPostId } from '../App';
import { supabase } from '../lib/supabase';

export const SearchBar = () => {


    const [list, setList] = useState([])

    useEffect(() => {
        supabase.from("posts").select("*").then(({ data }) => {
            setList(data)
        })
    }, [])

    const [searchList, setSearchList] = useState([])

    var newList = []
    const updateList = (value) => {
        setSearchList(list.filter(p => {
            if(!value) return
            const glob = p.preview + p.title
            return glob.toLowerCase().includes(value.toLowerCase())
        }))
    }

    return (
        <div>
            <TextField width="10" id="searchBar" onChange={() => { updateList(searchBar.value) }} label="Search" />
            {searchList.map((item) => { return <div style={{ cursor: "pointer" }} onClick={() => setPostId(item.id)}>{item.preview}</div> })}
        </div>
    )
}