import "./App.css";
import { LoginForm } from "./ui/LoginForm";
import { DonationCard } from "./ui/DonationCard";
import { FeedCard } from "./ui/FeedCard";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobeView } from "./ui/GlobeView";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const slotStyles = {
	position: "absolute",
	padding: "8px",
}

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<GlobeView />
			<div
				style={{
					right: 0,
					top: 0,
					...slotStyles
				}}
			>
				<LoginForm />
			</div>
			<div
				style={{
					right: 0,
					bottom: 0,
					...slotStyles
				}}
			>
				<FeedCard/>
			</div>
			<div
				style={{
					left: 0,
					top: 0,
					...slotStyles
				}}
			>
				Test
			</div>
			<div
				style={{
					left: 0,
					bottom: 0,
					...slotStyles
				}}
			>
				<DonationCard />
			</div>
		</ThemeProvider>
	);
}

export default App;
