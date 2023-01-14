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
import { CreatePostDialog } from "./CreatePostDialog";

export function CreatePostCard() {
	const [editOpen, setEditOpen] = useState(false);
	const [createOpen, setCreateOpen] = useState(false);
	const user = useContext(UserContext);

	return (
		<Card sx={{ width: 350, padding: 0 }}>
			<CardHeader
				avatar={
					<Avatar src={user.user_metadata.image}>
						{user.user_metadata?.full_name?.[0]}
					</Avatar>
				}
				action={
					<>
						<IconButton onClick={() => setEditOpen(true)}>
							<MoreVert />
						</IconButton>
						<IconButton onClick={() => setCreateOpen(true)}>
							<AddIcon />
						</IconButton>
					</>
				}
				title={
					<>
						{user.user_metadata?.name}{" "}
						<span style={{ color: "grey" }}>
							{user.user_metadata?.position}
						</span>
					</>
				}
				subheader={user.email}
			/>

			<UserActionDialog open={editOpen} setOpen={setEditOpen} />
			{user.user_metadata?.name && (
				<CreatePostDialog open={createOpen} setOpen={setCreateOpen} />
			)}
		</Card>
	);
}
