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
    useEffect(() => {
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
        supabase.from("comments").select("*").eq("post_id", postId).then(({data}) => {
            setComments(data)
        })
    }, [postId])
    return <Dialog open={!!postId} onClose={() => setPostId("")}>
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
        <TextField label="Commentaire" value={text} onChange={(e) => setText(e.target.value)} />
        <Button onClick={async () => {
            const c = {
                name: user?.user_metadata.name,
                text,
                image: user?.user_metadata.image,
                position: user?.user_metadata.position,
                post_id: postId
            }
            await supabase.from("comments").insert(c)
            setComments([...comments, c])
        }}>Send</Button>
    </Dialog>
}