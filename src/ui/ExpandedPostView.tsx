import { Avatar, Button, Card, CardHeader, Dialog, Input, TextField, useStepContext } from "@mui/material"
import React, { createContext, useContext, useEffect, useState } from "react"
import { setPostId } from "../App"
import { supabase } from "../lib/supabase"
import { UserContext } from "../lib/UserContext"
import { PostData } from "../types"
import { LiveChat } from "./LiveChat"
import { PostView } from "./PostView"

export const PostIDContext = createContext<string>("")

export const ExpandedPostView = () => {
    const user = useContext(UserContext)
    const postId = useContext(PostIDContext)
    const [data, setData] = useState<PostData | null>()
    const [comments, setComments] = useState<any[]>([]);
    const [text, setText] = useState("")
    const [isSending, setIsSending] = useState(false)
    useEffect(() => {
        if (!postId) return
        supabase.from("posts").select("*")
            .eq("id", postId).single().then(({ data }) => {
                supabase.from("profiles").select("*").eq("id", data.author_id).single().then(({ data: authorData }) => {
                    setData({
                        ...data,
                        author_image: authorData.image,
                        author_name: authorData.name,
                        author_position: authorData.position
                    })
                })
            })
        supabase.from("comments").select("*").eq("post_id", postId).then(({ data }) => {
            setComments(data as any)
        })
    }, [postId])
    return <Dialog open={!!postId} onClose={() => setPostId("")} sx={{
        overflow: "visible"
    }}>
        <div>
            {data && <>
                <PostView value={data} />
                {comments.map((c, i) => {
                    return <Card key={i}>
                        <CardHeader
                            avatar={
                                <Avatar src={c.image}>
                                    {c.name[0]}
                                </Avatar>
                            }
                            title={
                                <>
                                    {c.name}{" "}
                                    <span style={{ color: "grey" }}>
                                        {c.position}
                                    </span>
                                </>
                            }
                            subheader={c.text}
                        />
                    </Card>
                })}
            </>}
            <TextField
                multiline
                label="Commentaire" value={text} onChange={(e) => setText(e.target.value)} fullWidth />
                {isSending && "Sending..."}
            <Button
                fullWidth
                onClick={async () => {
                    setIsSending(true)

                    // @ts-ignore
                    const model = await window.toxicity.load(0.9);
                    const isToxic = async (message) => {
                        // Get predictions
                        const predictions = await model.classify(message);
                        // Check if there are toxic messages in the predictions
                        // Match is true when the message is toxic
                        const toxicPredictions = predictions.filter((p) => p.results[0].match);
                        return toxicPredictions.length > 0;
                    };

                    if (await isToxic(text)) {
                        setIsSending(false)
                        alert("Wowow, chill man, your message too toxic")
                        return 
                    }

                    const c = {
                        name: user?.user_metadata.name,
                        text,
                        image: user?.user_metadata.image,
                        position: user?.user_metadata.position,
                        post_id: postId
                    }
                    await supabase.from("comments").insert(c)
                    setComments([...comments, c])
                    setText("")
                    setIsSending(false)

                }}>Send</Button>
        </div>
    </Dialog>
}