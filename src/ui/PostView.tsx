import {
	Card,
	CardContent,
	CardHeader,
	Avatar,
	Typography,
	Badge,
	Chip,
} from "@mui/material";
import React from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	CircleMarker,
} from "react-leaflet";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { PostData } from "../types";

export const PostView = (props: { value: PostData }) => {
	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar src={props.value.author_image}>
						{props.value?.author_name[0]}
					</Avatar>
				}
				title={
					<>
						{props.value.author_name}{" "}
						<span style={{ color: "grey" }}>{props.value.author_position}</span>
					</>
				}
				subheader={`Publie le ${props.value.created_at}`}
			/>
			<CardContent>
				<MapContainer
					style={{ width: "100%", height: 200 }}
					center={[props.value.latitude, props.value.longitude]}
					zoom={13}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[props.value.latitude, props.value.longitude]} />
				</MapContainer>
				<Typography variant="h5" sx={{ marginTop: 1 }}>
					{props.value.title}
				</Typography>
				<Typography variant="h6">{props.value.preview}</Typography>
				<div style={{ marginBottom: 10 }}>
					{props.value.tags.map((v, i) => {
						return <Chip key={i} label={v} variant="outlined" />;
					})}
				</div>
				{props.value.body.map((v, i) => {
					return v.kind === "image" ? (
						<img src={v.value} key={i} style={{ width: "100%" }} />
					) : (
						<ReactMarkdown key={i}>{v.value}</ReactMarkdown>
					);
				})}
			</CardContent>
		</Card>
	);
};
