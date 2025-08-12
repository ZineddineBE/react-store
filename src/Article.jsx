import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function Article({ src, title, price }) {
	return (
		
		<Card>
			<CardActionArea>
				<CardMedia
					component="img"
					height="140"
					image={src}
					alt={title}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: "text.secondary" }}>
						{price}€
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
