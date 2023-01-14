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
	const [name, setName] = useState<string>(user?.user_metadata.name || "");
	const [position, setPosition] = useState<string>(
		user?.user_metadata.position || ""
	);

	const [image, setImage] = useState<string>(user?.user_metadata.image || "");

	const [bio, setBio] = useState<string>(user?.user_metadata.bio || "");

	async function update() {
		await supabase.auth.updateUser({
			data: {
				name,
				position,
				bio,
			},
		});
		props.setOpen(false);
		await syncProfile();
	}

	async function updatePhoto(file: File) {
		if (!file) return;
		const { data, error } = await supabase.storage
			.from("assets")
			.upload(v4(), file);
		if (error) {
			console.log(error);
			return;
		}
		const {
			data: { publicUrl },
		} = supabase.storage.from("assets").getPublicUrl(data.path);
		await supabase.auth.updateUser({
			data: {
				image: publicUrl,
			},
		});
		setImage(publicUrl);
		await syncProfile();
	}

	async function syncProfile() {
		await supabase.from("profiles").upsert({
			id: user!.id,
			name,
			position,
			image,
			bio,
		});
	}

	return (
		<Dialog open={props.open} onClose={() => props.setOpen(false)} fullWidth>
			<DialogTitle>Modifier votre compte</DialogTitle>
			<DialogContent>
				<Stack direction="row" spacing={5}>
					<Stack direction="column" spacing={2}>
						<Avatar sx={{ width: 100, height: 100 }} src={image}>
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
					<Stack width={500}>
						<TextField
							autoFocus
							label="Nom"
							value={name}
							fullWidth
							variant="filled"
							onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							autoFocus
							label="Position"
							value={position}
							fullWidth
							variant="filled"
							onChange={(e) => setPosition(e.target.value)}
						/>
						<TextField
							multiline
							rows={4}
							label="Bio"
							value={bio}
							fullWidth
							variant="filled"
							onChange={(e) => setBio(e.target.value)}
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
