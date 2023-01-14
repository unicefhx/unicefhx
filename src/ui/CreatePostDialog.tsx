import {
	Button,
	ButtonGroup,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";

import { Add, ArrowUpward, Delete } from "@mui/icons-material";
import { Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMapEvents,
} from "react-leaflet";
import { v4 } from "uuid";
import { supabase } from "../lib/supabase";
import { UserContext } from "../lib/UserContext";
import { PostBodyEntry } from "../types";
import { PostView } from "./PostView";

export const CreatePostDialog = (props: {
	open: boolean;
	setOpen: (v: boolean) => void;
}) => {
	const user = useContext(UserContext);
	const [title, setTitle] = useState("");
	const [preview, setPreview] = useState("");
	const [latitude, setLatitude] = useState(45.5);
	const [longitude, setLongitude] = useState(-73.62);
	const [map, setMap] = useState<Map | null>(null);
	const [tab, setTab] = useState(0);
	const [body, setBody] = useState<PostBodyEntry[]>([
		{
			kind: "markdown",
			value: "Salut Monde!",
		},
	]);

	function MapEventHandler() {
		const map = useMapEvents({
			click: (a) => {
				console.log(a.latlng);
				setLatitude(a.latlng.lat);
				setLongitude(a.latlng.lng);
				map.flyTo(a.latlng, map.getZoom());
			},
			locationfound: (location) => {
				setLatitude(location.latlng.lat);
				setLongitude(location.latlng.lng);
				map.flyTo(location.latlng, map.getZoom());
			},
		});
		setMap(map);
		return null;
	}

	function BodyControlButton(props: { i: number }) {
		const insert = (value: { kind: "image" | "markdown"; value: string }) => {
			const newBody = [...body];
			newBody.splice(props.i, 0, value);
			setBody(newBody);
		};
		const moveUp = () => {
			const newBody = [...body];
			const temp = newBody[props.i];
			newBody[props.i] = newBody[props.i - 1];
			newBody[props.i - 1] = temp;
			setBody(newBody);
		};

		const remove = () => {
			const newBody = [...body];
			newBody.splice(props.i, 1);
			setBody(newBody);
		};

		const uploadImage = async (file: File) => {
			const { data, error } = await supabase.storage
				.from("assets")
				.upload(v4(), file);
			if (error) {
				console.log(error);
			} else {
				console.log(data);
			}
			if (!data) return;
			const {
				data: { publicUrl },
			} = supabase.storage.from("assets").getPublicUrl(data?.path);
			insert({ kind: "image", value: publicUrl });
		};

		const input = useRef<HTMLInputElement>(null);

		return (
			<ButtonGroup>
				<Button startIcon={<Add />} onClick={() => input.current?.click()}>
					<input
						ref={input}
						type="file"
						accept="image/*"
						hidden
						onChange={(e) => uploadImage(e.target.files![0])}
					/>
					Image
				</Button>
				<Button
					startIcon={<Add />}
					onClick={() => insert({ kind: "markdown", value: "" })}
				>
					Markdown
				</Button>
				<Button startIcon={<ArrowUpward />} onClick={moveUp}>
					Deplacer
				</Button>
				<Button
					startIcon={<Delete />}
					onClick={remove}
					disabled={body.length <= 1}
				>
					Supprimer
				</Button>
			</ButtonGroup>
		);
	}

	return (
		<Dialog open={props.open} onClose={() => props.setOpen(false)} fullScreen>
			<DialogTitle>Partager un poste</DialogTitle>
			<DialogContent>
				<Tabs
					value={tab}
					onChange={(_e, v) => setTab(v)}
					sx={{ marginBottom: 3 }}
				>
					<Tab label="Editeur" />
					<Tab label="En Forme" />
				</Tabs>

				<div hidden={tab !== 0}>
					<TextField
						autoFocus
						margin="dense"
						label="Titre"
						type="text"
						fullWidth
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<TextField
						autoFocus
						multiline
						margin="dense"
						label="Apercu"
						type="text"
						fullWidth
						value={preview}
						onChange={(e) => setPreview(e.target.value)}
					/>
					<Typography variant="h6" sx={{ marginTop: 1 }}>
						Geolocalisation
					</Typography>
					<div
						style={{
							marginTop: 10,
							marginBottom: 10,
						}}
					>
						La position de votre publication: {latitude} {longitude}
						<MapContainer
							style={{ width: "100%", height: 300 }}
							center={[latitude, longitude]}
							zoom={13}
							scrollWheelZoom={false}
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<Marker position={[latitude, longitude]}>
								<Popup>
									A pretty CSS3 popup. <br /> Easily customizable.
								</Popup>
							</Marker>
							<MapEventHandler />
						</MapContainer>
					</div>
					<Button
						onClick={() => {
							map?.locate();
						}}
					>
						Utiliser ma position
					</Button>
					<Typography variant="h6" sx={{ marginTop: 1, marginBottom: 2 }}>
						Contenu
					</Typography>
					<Stack style={{ marginTop: 10, marginBottom: 10 }} spacing={3}>
						{body.map((v, i) => {
							const item =
								v.kind === "image" ? (
									<img src={v.value} style={{ width: "100%" }} />
								) : (
									<TextField
										multiline
										value={v.value}
										fullWidth
										label="Markdown"
										onChange={(e) => {
											const newBody = [...body];
											newBody[i].value = e.target.value;
											setBody(newBody);
										}}
									/>
								);
							return (
								<Stack spacing={1} key={i}>
									<div>{item}</div>
									<div>
										<BodyControlButton i={i} />
									</div>
								</Stack>
							);
						})}
					</Stack>
				</div>
				<div hidden={tab !== 1}>
					<PostView
						value={{
							title,
							preview,
							body,
							author_image: user?.user_metadata.image as string,
							author_name: user?.user_metadata.name as string,
							author_position: user?.user_metadata.position as string,
							image: body.find((v) => v.kind === "image")?.value as string,
							created_at: new Date().toISOString(),
							latitude,
							longitude,
							tags: [],
						}}
					/>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => props.setOpen(false)} color="primary">
					Cancel
				</Button>
				<Button onClick={() => props.setOpen(false)} color="primary">
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};
