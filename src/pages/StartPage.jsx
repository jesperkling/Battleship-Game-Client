import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { useGameContext } from "../contexts/GameContextProvider"
import './startpage.css'

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

	socket.on('new-game-list', () => {
		socket.emit('get-game-list', (games) => {
			const list = games.filter((game) => game.id)
			setGameList(list)
		})
	})

	useEffect(() => {
		console.log('Requesting game list from server..')
		socket.emit('get-game-list', (games) => {
			const list = games.filter((game) => game.id)
			setGameList(list)
		})
	}, [socket])

	return (
		<startPage>
			<div id="login">
				<Form onSubmit={handleSubmit}>
					<Form.Group className="login-form" controlId="username">
						<Form.Label>Username</Form.Label>
						<Form.Control 
							onChange={(e) => setUsername(e.target.value)}
							placeholder='Enter username'
							required
							type='text'
							value={username}
						/>
					</Form.Group>

					<Form.Group className="choose-room" controlId="game">
						<Form.Label>Game</Form.Label>
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
									{gameList.map((game) => (
										<option key={game.id} value={game.id}>
											{game.name}
										</option>
									))}
								</>
							)}
						</Form.Select>
					</Form.Group>

					<div className="btn-join">
						<Button
							variant="success"
							type="submit"
							className="w-100"
							disabled={!username || !game}
						>Join</Button>
					</div>
				</Form>
			</div>
		</startPage>
	)
}

export default StartPage