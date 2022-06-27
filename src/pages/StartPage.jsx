import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { useGameContext } from "../contexts/GameContextProvider"
import '../App.css'

const StartPage = () => {
	const [username, setUsername] = useState('')
	const [game, setGame] = useState()
	const [customGame, setCustomGame] = useState('')
	const [gameList, setGameList] = useState([])
	const { setGameUsername, socket } = useGameContext()
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		setGameUsername(username)

		if (customGame) {
			socket.emit('check-games', customGame, (status) => {
				status.success 
					? navigate(`/games/${customGame}`) 
					: alert('game name already exists')
			})
		} else {
			navigate(`/games/${game}`)
		}
		socket.emit('update-list')
	}

	socket.on('new-game-list', () => {
		socket.emit('get-game-list', (games) => {
			const list = games.filter((game) => game.id)
			console.log(list)
			setGameList(list)
		})
	})

	useEffect(() => {
		console.log('Requesting game list from server..')
		socket.emit('get-game-list', (games) => {
			const list = games.filter((game) => game.id)
			console.log(list)
			setGameList(list)
		})
	}, [socket])

	return (
		<div className='startPage'>
			<div id="login">
				<h2 className="login-header">Battleship Game</h2>

				<Form onSubmit={handleSubmit}>
					<Form.Group className="login-form" controlId="username">
						{/* <Form.Label>Username</Form.Label> */}
						<Form.Control 
							onChange={(e) => setUsername(e.target.value)}
							placeholder='Enter username'
							required
							type='text'
							value={username}
						/>
					</Form.Group>

					<Form.Group className="choose-room" controlId="custom-game">
						{/* <Form.Label>Create game</Form.Label> */}
						<Form.Control
							onChange={(e) => setCustomGame(e.target.value)}
							placeholder='Name of game'
							type='text'
							value={customGame}
						/>

						<div className="btn-join">
							<Button
								variant="success"
								type="submit"
								className="w-100"
								disabled={!username || !customGame || !customGame.trim()}
							>
								Create Game
							</Button>
						</div>
					</Form.Group>

					<Form.Group className="create-room" controlId="game">
						{/* <Form.Label>Open Games</Form.Label> */}
						<Form.Select
							onChange={(e) => setGame(e.target.value)}
							value={game}
							disabled={customGame}
						>
							{!gameList && <option disabled>Waiting...</option>}

							{gameList.length && (
								<>
									<option value=''>
										Select game to join
									</option>
									{gameList.map((game) => (
										<option key={game.id} value={game.id}>
											{game.name}
										</option>
									))}
								</>
							)}
						</Form.Select>

						<div className="btn-join">
							<Button
								variant="success"
								type="submit"
								className="w-100"
								disabled={!username || !game}
							>
								Join existing game
							</Button>
						</div>
					</Form.Group>
				</Form>
			</div>
		</div>
	)
}

export default StartPage