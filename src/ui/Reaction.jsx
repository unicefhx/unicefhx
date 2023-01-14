import IconButton from '@mui/material/IconButton';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useState } from 'react';


export const Reaction = () => {
    const [isLiked,setIsLiked]=useState(false)
    const [isDisliked,setIsDisliked]=useState(false)
    return(
        <div>
            <IconButton aria-label="like" size="small" 
                onClick={()=>{
                    setIsLiked(!isLiked)
                    setIsDisliked(false)    
                }}>
                {isLiked==true && <ThumbUpAltIcon fontSize="inherit"/>}
                {isLiked==false && <ThumbUpOffAltIcon fontSize="inherit"/>}
            </IconButton>
            <IconButton aria-label="dislike" size="small" 
                onClick={()=>{
                    setIsDisliked(!isDisliked)
                    setIsLiked(false)
                }}>
                {isDisliked==true && <ThumbDownAltIcon fontSize="inherit" />}
                {isDisliked==false && <ThumbDownOffAltIcon fontSize="inherit" />}
            </IconButton>
            
        </div>
    )
}