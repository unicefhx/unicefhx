import React from 'react';
import { Card, Typography, List, TextField, Button } from '@mui/material';

export const LiveChat = () => {
	let comments = [
		{
			author: "jesuisdrole",
			comment_title: "Je ne suis pas drole",
			comment: "Ceci n'est pas drole",
			time: "dd-mm-yyyy",
		},
		{
			author: "jesuisdrole",
			comment_title: "Je ne suis pas drole",
			comment: "Ceci n'est pas drole",
			time: "dd-mm-yyyy",
		},
		{
			author: "jesuisdrole",
			comment_title: "Je ne suis pas drole",
			comment: "Ceci n'est pas drole",
			time: "dd-mm-yyyy",
		},
		{
			author: "jesuisdrole",
			comment_title: "Je ne suis pas drole",
			comment: "Ceci n'est pas drole",
			time: "dd-mm-yyyy",
		},
		{
			author: "jesuisdrole",
			comment_title: "Je ne suis pas drole",
			comment: "Ceci n'est pas drole",
			time: "dd-mm-yyyy",
		},
		{
			author: "jesuisdrole",
			comment_title: "Je ne suis pas drole",
			comment: "Ceci n'est pas drole",
			time: "dd-mm-yyyy",
		},
		{
			author: "jesuisdrole",
			comment_title: "Je ne suis pas drole",
			comment: "Ceci n'est pas drole",
			time: "dd-mm-yyyy",
		},
		{
			author: "jesuisdrole",
			comment_title: "Je ne suis pas drole",
			comment: "Ceci n'est pas drole",
			time: "dd-mm-yyyy",
		},
		{
			author: "jesuisdrole",
			comment_title: "Je ne suis pas drole",
			comment: "Ceci n'est pas drole",
			time: "dd-mm-yyyy",
		},
	];

    return (
        <div className="App"
            style={{
                width: "20vw",
                height: "40vh",
            }}
        >
            <Card
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <Typography
                    style={{
                        marginLeft: "1vw",
                        marginTop: "2vh",
                    }}
                >Commentaires :</Typography>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: "100%",
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: "70%",
                    }}
                >
                    {comments.map((comments) => {
                    return (
                        <div className="message"
                            style={{
                                marginLeft : "1vw"
                            }}
                        > 
                            <h5
                                style={{

                                }}
                            >@{comments.author} :</h5>
                            <h5
                                style={{
                                    marginTop : "-2vh"  
                                }}
                            >{comments.comment}</h5>
                            <h5
                                style={{
                                    marginTop : "-2vh",
                                    color : "grey",
                                    opacity : 0.8  
                                }}
                            >{comments.time}</h5>
                        </div>
                        )
                    })}
                </List>
                <div
                    style={{
                        flexDirection: 'row',
                        marginTop: "-4vh",
                    }}
                >
                    <textarea label="Comment" size="small" 
                        style={{ marginLeft: "5%", width : "65%", marginTop: "10%", height: "5vh" }} 
                        onChange={{

                        }}
                    />
                    <Button variant="contained" style={{ height : "5vh", marginLeft: "2%", marginTop : "-15%" }}
                        onClick={() => {

                        }}
                    >Lmao</Button>
                </div>
            </Card>
        </div>
    )
}
