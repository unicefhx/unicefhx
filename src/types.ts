export type PostBodyEntry = {
	kind: "image" | "markdown";
	value: string;
};

export type PostData = {
	title: string;
	preview: string;
	image: string;
	body: PostBodyEntry[];
	tags: string[];
	author_name: string;
	author_position: string;
	author_image: string;
  created_at: string;
  latitude: number;
  longitude: number;
};
