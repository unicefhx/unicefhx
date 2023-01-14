import React from 'react';
import { Card, Typography, List, TextField, Button } from '@mui/material';

export const LiveChat = () => {
    let comments = [];

    return (
        <div className="App"
            style={{
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
                                    marginLeft: "1vw"
                                }}
                            >
                                <h5
                                    style={{
                                    }}
                                >@{comments.author} :</h5>
                                <h5

                                >{comments.comment}</h5>
                                <h5
                                    style={{

                                        color: "grey",
                                        opacity: 0.8
                                    }}
                                >{comments.time}</h5>
                            </div>
                        )
                    })}
                </List>
                <div
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <TextField multiline label="comment" />
                    <Button variant="contained" style={{ height: "5vh", marginLeft: "2%" }}
                        onClick={() => {

                        }}
                    >
                        Send</Button>
                </div>
            </Card>
        </div>
    )
}
