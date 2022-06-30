import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { useGameContext } from "../contexts/GameContextProvider"
import { uniqueNamesGenerator, animals } from 'unique-names-generator'
import '../assets/css/Startpage.css'

const StartPage = () => {
	const [username, setUsername] = useState('')
	const [game, setGame] = useState()
	// const [customGame, setCustomGame] = useState('')
	const [generateRoom, setGenerateRoom] = useState(false)
	const [gameList, setGameList] = useState([])
	const { setGameUsername, socket } = useGameContext()
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		setGameUsername(username)

		if (generateRoom) {
			const randomName = uniqueNamesGenerator({
				dictionaries: [animals],
				separator: '-',
				length: 1,
			})
			navigate(`/games/${randomName}`)
		} else if (game) {
			navigate(`/games/${game}`)
		}
		socket.emit('update-list')
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
						<Form.Control 
							onChange={(e) => setUsername(e.target.value)}
							placeholder='Enter username'
							required
							type='text'
							value={username}
						/>
					</Form.Group>

					<Form.Group className="create-room" controlId="game">
						<Form.Select
							onChange={(e) => setGame(e.target.value)}
							value={game}
						>
							{!gameList && <option disabled>Waiting...</option>}

							{gameList.length && (
								<>
									<option value=''>
										Select game to join
									</option>
									{gameList.map((game) => (
										<option key={game.id} value={game.id}>
											{Object.keys(game.players).length} / 2
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

						<div className="btn-join">
							<Button
								variant="success"
								type="submit"
								className="w-100"
								onClick={() => setGenerateRoom(true)}
								disabled={game}
							>
								Generate game
							</Button>
						</div>
					</Form.Group>
				</Form>
			</div>
		</div>
	)
}

export default StartPage