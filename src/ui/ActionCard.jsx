import AddIcon from "@mui/icons-material/Add";
import MoreVert from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import React, { useContext, useEffect, useState } from "react";
import { UserActionDialog } from "./UserActionDialog";
import { UserContext } from "../lib/UserContext";
import { supabase } from "../lib/supabase";

export function CreatePostCard() {
	const [editOpen, setEditOpen] = useState(false);
	const [profileUrl, setProfileUrl] = useState(null);
	const user = useContext(UserContext);

	useEffect(() => {
		const {
			data: { publicUrl },
		} = supabase.storage.from("assets").getPublicUrl(user.id);
		setProfileUrl(publicUrl);
	}, []);

	return (
		<Card sx={{ width: 400 }}>
			<CardContent>
				<CardHeader
					avatar={
						<Avatar src={profileUrl}>
							{user.user_metadata?.full_name?.[0]}
						</Avatar>
					}
					action={
						<>
							<IconButton onClick={() => setEditOpen(true)}>
								<MoreVert />
							</IconButton>
							<IconButton>
								<AddIcon />
							</IconButton>
						</>
					}
					title={
						<>
							{user.user_metadata?.full_name}{" "}
							<span style={{ color: "grey" }}>
								{user.user_metadata?.position}
							</span>
						</>
					}
					subheader={user.email}
				/>
			</CardContent>
			<UserActionDialog open={editOpen} setOpen={setEditOpen} />
		</Card>
	);
}
