import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function LoginForm() {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Vous n'avez
				</Typography>

				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					adjective
				</Typography>
				<Typography variant="body2">
					well meaning and kindly.
					<br />
					{'"a benevolent smile"'}
				</Typography>
			</CardContent>
			<CardActions>
				<Button variant="contained" size="small">Connectez-vous</Button>
			</CardActions>
		</Card>
	);
}
