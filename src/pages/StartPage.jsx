import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useGameContext } from "../contexts/GameContextProvider"

const StartPage = () => {
	const [username, setUsername] = useState('')
	const [game, setGame] = useState()
	const [gameList, setGameList] = useState([])
	const { setGameUsername, socket } = useGameContext()
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()

		setGameUsername(username)

		navigate(`/games/${game}`)
	}

	useEffect(() => {
		console.log('Requesting game list from server..')
		socket.emit('get-game-list', (rooms) => {
			setGameList(rooms)
		})
	}, [socket])

	return (
		<div id="login">
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control 
						onChange={(e) => setUsername(e.target.value)}
						placeholder='Enter username'
						required
						type='text'
						value={username}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="room">
					<Form.Label>Room</Form.Label>
					<Form.Select
						onChange={(e) => setGame(e.target.value)}
						required
						value={game}
					>
						{gameList.length === 0 && (
							<option disabled>Loading...</option>
						)} 
						{gameList.length && (
							<>
								<option value="">Select a room to join</option>
								{gameList.map((r) => (
									<option key={r.id} value={r.id}>
										{r.name}
									</option>
								))}
							</>
						)}
					</Form.Select>
				</Form.Group>

				<div className="d-flex justify-content-between">
					<Button
						variant="success"
						type="submit"
						className="w-100"
						disabled={!username || !game}
					>Join</Button>
				</div>
			</Form>

		</div>
	)
}

export default StartPage