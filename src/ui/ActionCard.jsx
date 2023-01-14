import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import MoreVert from "@mui/icons-material/MoreVert";
import Stack from "@mui/material/Stack";
import React from "react";
import { supabase } from "../lib/supabase";

export function CreatePostCard() {
	const [editOpen, setEditOpen] = React.useState(false);

	return (
		<Card sx={{ width: 400 }}>
			<CardContent>
				<CardHeader
					avatar={<Avatar>R</Avatar>}
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
					title="Robert Smith"
					subheader="Journaliste Unicef"
				/>
			</CardContent>
			<Dialog open={editOpen} onClose={() => setEditOpen(false)}>
				<DialogTitle>Modifier votre profile</DialogTitle>
				<DialogContent>
					<Stack direction="row" spacing={5}>
						<Stack direction="column" spacing={2}>
							<Avatar sx={{ width: 100, height: 100 }}>R</Avatar>
							<div style={{ display: "flex", justifyItems: "center" }}>
								<Button
									color="primary"
									component="label"
									startIcon={<EditIcon />}
								>
									<input hidden accept="image/*" type="file" />
									Photo
								</Button>
							</div>
						</Stack>
						<Stack>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Votre nom"
								fullWidth
								variant="standard"
							/>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Votre position"
								fullWidth
								variant="standard"
							/>
						</Stack>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => supabase.auth.signOut()}>Deconnexion</Button>
					<Button onClick={() => setEditOpen(false)}>Annuler</Button>
					<Button onClick={() => setEditOpen(false)}>Modifier</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
}
