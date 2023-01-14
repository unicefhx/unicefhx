import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { motion } from "framer-motion";

export const FeedCard = () => {

    let itemData = [
        {
          img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
          title: 'Breakfast',
          headline: '@bkristastucchio',
        },
        {
          img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
          title: 'Burger',
          headline: '@rollelflex_graphy726',
        },
        {
          img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
          title: 'Camera',
          headline: '@helloimnik',
        },
        {
          img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
          title: 'Coffee',
          headline: '@nolanissac',
        },
        {
          img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
          title: 'Hats',
          headline: '@hjrc33',
        },
        {
          img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
          title: 'Honey',
          headline: '@arwinneil',
        },
        {
          img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
          title: 'Basketball',
          headline: '@tjdragotta',
        },
        {
          img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
          title: 'Fern',
          headline: '@katie_wasserman',
        },
        {
          img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
          title: 'Mushrooms',
          headline: '@silverdalex',
        },
        {
          img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
          title: 'Tomato basil',
          headline: '@shelleypauls',
        },
        {
          img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
          title: 'Sea star',
          headline: '@peterlaster',
        },
        {
          img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
          title: 'Bike',
          headline: '@southside_customs',
        },
    ];

    const cardVariants = {
        onHover : { opacity : 1 },
        clickedState : { opacity : 1, x: "-32vw", y: "-40vh", marginBottom : "12vh", 
                          marginLeft : "-25vw", scale : 1.5, width : "14vw", height : "100%" },
        unClickedState : { opacity : 0.2 },
    }

    const [isClicked, setIsClicked] = React.useState(false);

	return (
		<motion.div
            style={{
                opacity : 0.2,
            }}
            whileHover={{opacity:1}}
            animate={isClicked ? 'clickedState' : 'unClickedState'}
            transition={{ stiffness : 700, damping : 30 }}
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
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
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
