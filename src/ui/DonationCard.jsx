import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const DonationCard = () => {
	return (
		<div>
			<Card sx={{ minWidth: 275 }}>
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						Joignez-vous à notre cause!
					</Typography>
					<Typography variant="body2">
						Faites un don à l'UNICEF
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">Learn More</Button>
				</CardActions>
			</Card>
		</div>
	);
};
