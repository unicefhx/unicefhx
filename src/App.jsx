import "./App.css";
import { LoginForm } from "./ui/LoginForm";
import { DonationCard } from "./ui/DonationCard";
import { FeedCard } from "./ui/FeedCard";
import { LogoIcon } from "./ui/LogoIcon";
import { LiveChat } from "./ui/LiveChat";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobeView } from "./ui/GlobeView";
import { supabase } from "./lib/supabase";
import { useEffect, useState } from "react";
import { CreatePostCard } from "./ui/ActionCard";
import { UserContext } from "./lib/UserContext";

import { motion } from "framer-motion";

const darkTheme = createTheme({
	palette: {
		mode: "light",
	},
});

const slotStyles = {
	position: "absolute",
	padding: "8px",
};

function App() {
	const [user, setUser] = useState();

	useEffect(() => {
		supabase.auth.getUser().then((res) => {
			setUser(res.data.user);
		});

		supabase.auth.onAuthStateChange((event, session) => {
			setUser(session?.user ?? null);
		});
	}, []);

	return (
		<UserContext.Provider value={user}>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<GlobeView />
				<motion.div
					style={{
						right: -500,
						top: 0,
						...slotStyles,
					}}
					animate={{ right: 0 }}
					transition={{ duration: 0.75 }}
				>
					{user ? <CreatePostCard /> : <LoginForm />}
				</motion.div>
				<motion.div
					style={{
						right: -500,
						bottom: 0,
						...slotStyles,
					}}
					animate={{ right: 0 }}
					transition={{ duration: 0.75 }}
				>
					<FeedCard />
				</motion.div>
				<motion.div
					style={{
						x: "-20vw",
						top: 0,
						...slotStyles,
					}}
					animate={{ x : "2vw" }}
					transition={{ duration : 0.75 }}
				>
					<LogoIcon />
				</motion.div>
				<motion.div
					style={{
						x: "-20vw",
						bottom: 0,
						...slotStyles,
					}}
					animate={{ x: 0 }}
					transition={{ duration: 0.75 }}
				>
					<LiveChat style={{ marginBottom: 300 }} />
					<DonationCard />
				</motion.div>
			</ThemeProvider>
		</UserContext.Provider>
	);
}

export default App;
