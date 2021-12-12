import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardText, CardBody, CardTitle, CardImg, CardGroup } from 'reactstrap';
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = new URLSearchParams(window.location.search).get(
			"access_token"
		);

		axios
			.get("http://localhost:8010/proxy/user", {
				headers: {
					Authorization: "token " + token,
				},
			})
			.then((res) => {
				setUser(res.data);
				setLoggedIn(true);
			})
			.catch((error) => {
				console.log("error " + error);
			});
	}, []);

	return (
		<div className="App text-center container-fluid">
			{!loggedIn ? (
				<>
					<img
						className="mb-4"
						src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
						width="150"
					></img>
					<h1 className="h3 mb-3 font-weight-normal">Sign in with GitHub</h1>
					<Button
						type="primary"
						className="btn"
						size="lg"
						href="https://github.com/login/oauth/authorize?client_id=6063e569ecde4036a9eb&redirect_uri=http://localhost:8080/oauth/redirect"
					>
						Sign in
					</Button>
				</>
			) : (
				<>
					<Button
						onClick={function noRefCheck() { setLoggedIn(false); }}
						type="primary"
						className="btn"
						size="lg"
						href="http://localhost:3000/"
					>
						Signout
					</Button>
					<h1>Welcome!</h1>
					<p>
						This is a simple integration between OAuth2 on GitHub with Node.js
					</p>
					<CardGroup>
						{[...Array(3)].map((e, i) => (
							<div key={Math.random(0, 9)}>
								<Card
									style={{ width: '18rem' }}
									className="mb-2">
									<CardImg variant="top" src={user.avatar_url} />
									<CardBody>
										<CardTitle>{user.name}</CardTitle>
										<CardText>{user.bio}</CardText>
										<Button
											variant="primary"
											target="_blank"
											href={user.html_url}
										>
											GitHub Profile
										</Button>
									</CardBody>
								</Card>
							</div>
						))}
					</CardGroup>
				</>
			)}
		</div>
	);
}

export default App;