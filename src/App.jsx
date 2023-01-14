import "./App.css";
import { LoginForm } from "./ui/LoginForm";
import { DonationCard } from "./ui/DonationCard";
import { FeedCard } from "./ui/FeedCard";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobeView } from "./ui/GlobeView";
import { supabase } from "./lib/supabase";
import { useEffect, useState } from "react";
import { CreatePostCard } from "./ui/ActionCard";
import { UserContext } from "./lib/UserContext";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const slotStyles = {
	position: "absolute",
	padding: "8px",
};

function App() {
	console.log(supabase.auth);
	const [user, setUser] = useState();

	useEffect(() => {
		supabase.auth.getUser().then((user) => {
			setUser(user);
		});

		supabase.auth.onAuthStateChange((event, session) => {
			console.log("onAuthStateChange", event, session);
			setUser(session?.user ?? null);
		});
	}, []);

	return (
		<UserContext.Provider value={user}>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<GlobeView />
				<div
					style={{
						right: 0,
						top: 0,
						...slotStyles,
					}}
				>
					{user ? <CreatePostCard /> : <LoginForm />}
				</div>
				<div
					style={{
						right: 0,
						bottom: 0,
						...slotStyles,
					}}
				>
					<FeedCard />
				</div>
				<div
					style={{
						left: 0,
						top: 0,
						...slotStyles,
					}}
				>
					Test
				</div>
				<div
					style={{
						left: 0,
						bottom: 0,
						...slotStyles,
					}}
				>
					<DonationCard />
				</div>
			</ThemeProvider>
		</UserContext.Provider>
	);
}

export default App;
