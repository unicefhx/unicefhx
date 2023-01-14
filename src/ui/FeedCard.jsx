import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const FeedCard = () => {

  const [itemData, setItemData] = useState([])
  useEffect(() => {
    supabase.from("posts").select("*").then(({data, error}) => {
      console.log(data)
      setItemData(data)
    })
  }, [])

  const cardVariants = {
    onHover: { opacity: 1 },
    clickedState: {
      opacity: 1, x: "-32vw", y: "-40vh", marginBottom: "12vh",
      marginLeft: "-25vw", scale: 1.5, width: "14vw", height: "100%"
    },
    unClickedState: { opacity: 0.2 },
  }

  const [isClicked, setIsClicked] = React.useState(false);

  return (
    <motion.div
      style={{
        opacity: 0.2,
      }}
      whileHover={{ opacity: 1 }}
      animate={isClicked ? 'clickedState' : 'unClickedState'}
      transition={{ stiffness: 700, damping: 30 }}
      variants={cardVariants}
      onClick={() => setIsClicked(!isClicked)}
    >
      <Card sx={{ minWidth: "10vw" }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 20 }}>
            Votre fil d'actualité :
          </Typography>
          <motion.Typography style={{ fontSize: 14 }}>
            (Cliquez pour agrandir ou rétrécir)
          </motion.Typography>
        </CardContent>

        <ImageList sx={{ marginLeft: 2, width: 250, height: 225 }}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={<span style={{ fontSize: 10 }}>{item.headline}</span>}
                position="bottom"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Card>
    </motion.div>
  );
};
