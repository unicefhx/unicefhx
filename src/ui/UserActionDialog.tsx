import {
	Dialog,
	DialogTitle,
	DialogContent,
	Stack,
	Avatar,
	Button,
	TextField,
	DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useContext, useState } from "react";
import { supabase } from "../lib/supabase";
import { UserContext } from "../lib/UserContext";
import { v4 } from "uuid";

export const UserActionDialog = (props: {
	open: boolean;
	setOpen: (v: boolean) => void;
}) => {
	const user = useContext(UserContext);
	console.log(user);
	const [name, setName] = useState<string>(user?.user_metadata.full_name || "");
	const [position, setPosition] = useState<string>(
		user?.user_metadata.position || ""
	);

	const [photoUrl, setPhotoUrl] = useState<string>(
		user?.user_metadata.photo_url || ""
	);

	console.log(user?.user_metadata);

	async function update() {
		await supabase.auth.updateUser({
			data: {
				full_name: name,
				position: position,
			},
		});
		props.setOpen(false);
	}

	async function updatePhoto(file: File) {
		if (!file) return;
		const { data, error } = await supabase.storage
			.from("assets")
			.upload(user!.id, file);
		if (error) {
			console.log(error);
			return;
		}
		const {
			data: { publicUrl },
		} = supabase.storage.from("assets").getPublicUrl(data.path);
		await supabase.auth.updateUser({
			data: {
				photo_url: publicUrl,
			},
		});
		setPhotoUrl(publicUrl);
	}

	return (
		<Dialog open={props.open} onClose={() => props.setOpen(false)}>
			<DialogTitle>Modifier votre profile</DialogTitle>
			<DialogContent>
				<Stack direction="row" spacing={5}>
					<Stack direction="column" spacing={2}>
						<Avatar sx={{ width: 100, height: 100 }} src={photoUrl}>
							R
						</Avatar>
						<div style={{ display: "flex", justifyItems: "center" }}>
							<Button
								color="primary"
								component="label"
								startIcon={<EditIcon />}
							>
								<input
									hidden
									accept="image/*"
									type="file"
									onChange={(e) => updatePhoto(e.target.files![0])}
								/>
								Photo
							</Button>
						</div>
					</Stack>
					<Stack>
						<TextField
							autoFocus
							label="Votre nom"
							value={name}
							fullWidth
							variant="standard"
							onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							autoFocus
							label="Votre position"
							value={position}
							fullWidth
							variant="standard"
							onChange={(e) => setPosition(e.target.value)}
						/>
					</Stack>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => supabase.auth.signOut()}>Deconnexion</Button>
				<Button onClick={() => props.setOpen(false)}>Annuler</Button>
				<Button onClick={update}>Modifier</Button>
			</DialogActions>
		</Dialog>
	);
};
