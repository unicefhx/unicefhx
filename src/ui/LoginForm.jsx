import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export function LoginForm() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);
	const [ok, setOk] = useState(false);

	async function signInWithEmail() {
		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: "https://example.com/welcome",
			},
		});

		if (error) {
			setError(error.message);
		} else {
			setOk(true);
			setError(null);
		}
	}

	return (
		<Card sx={{ maxWidth: 400}} variant="outlined">
			<CardContent >
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Vous n'avez pas de compte.
				</Typography>
				<Typography sx={{ mb: 1 }} color="text.secondary">
					Créez-en un maintenant avec e-mail!
				</Typography>
				<Typography variant="body2" sx={{ marginBottom: 2 }}>
					En créant un compte, vous acceptez nos conditions d'utilisation et
					notre politique de confidentialité.
				</Typography>

				<Input
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					error={error}
				/>
				<Button
					variant="contained"
					size="small"
					sx={{ marginLeft: 1 }}
					onClick={signInWithEmail}
				>
					Envoyer le lien
				</Button>
				{error && <Typography color="error">{error}</Typography>}
				{ok && <Typography color="limegreen">Lien envoyé!</Typography>}
			</CardContent>
		</Card>
	);
}
