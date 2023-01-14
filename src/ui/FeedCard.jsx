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

    const itemData = [
        {
          img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
          title: 'Breakfast',
          author: '@bkristastucchio',
        },
        {
          img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
          title: 'Burger',
          author: '@rollelflex_graphy726',
        },
        {
          img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
          title: 'Camera',
          author: '@helloimnik',
        },
        {
          img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
          title: 'Coffee',
          author: '@nolanissac',
        },
        {
          img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
          title: 'Hats',
          author: '@hjrc33',
        },
        {
          img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
          title: 'Honey',
          author: '@arwinneil',
        },
        {
          img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
          title: 'Basketball',
          author: '@tjdragotta',
        },
        {
          img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
          title: 'Fern',
          author: '@katie_wasserman',
        },
        {
          img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
          title: 'Mushrooms',
          author: '@silverdalex',
        },
        {
          img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
          title: 'Tomato basil',
          author: '@shelleypauls',
        },
        {
          img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
          title: 'Sea star',
          author: '@peterlaster',
        },
        {
          img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
          title: 'Bike',
          author: '@southside_customs',
        },
    ];

    const cardVariants = {
        onHover : { opacity : 1 },
        clickedState : { opacity : 1, marginBottom : 130, marginLeft : -385, scale : 1.8, width : 275 },
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
            transition={{ type: "spring", stiffness : 700, damping : 30 }}
            variants={cardVariants}
            onClick={() => setIsClicked(!isClicked)}
        >
			<Card sx={{ minWidth: 275 }}
            >
				<CardContent>
					<Typography sx={{ fontSize: 20 }}>
						Votre fil d'actualité :
					</Typography>
          <motion.Typography style={{ fontSize: 14 }}>
						(Cliquez-ici pour agrandir/rétrécir)
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
                            subtitle={<span style={{ fontSize: 10 }}>by: {item.author}</span>}
                            position="below"
                        />
                        </ImageListItem>
                    ))}
                </ImageList>
			</Card>
		</motion.div>
	);
};
