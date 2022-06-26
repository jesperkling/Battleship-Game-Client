import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGameContext } from "../contexts/GameContextProvider"
import '../App.css'
import Battleboard from "../components/Battleboard"

const GameBoard = () => {
	const [players, setPlayers] = useState([])
	// const [connected, setConnected] = useState(false)
	const [waiting, setWaiting] = useState(true)
	const { gameUsername, socket } = useGameContext()
	const { game_id } = useParams()
	const navigate = useNavigate()

	const handleNewPlayers = (playerList) => {
		console.log('new player list', playerList)
		setPlayers(playerList)

		if (Object.keys(playerList).length === 2) {
			setWaiting(false)
			socket.emit('update-list')
		}
	}

	useEffect(() => {
		
		if (!gameUsername){
			navigate('/')
		}

		socket.emit('player:joined', gameUsername, game_id, (status) => {
			console.log(`Successfully joined ${game_id} as ${gameUsername}`, status)
		})
		// setConnected(true)

		socket.on('player:list', handleNewPlayers)

		return () => {
			socket.emit('player:left', gameUsername, game_id)
		}
	}, [socket, game_id, gameUsername, navigate])

	return (
		<>
			<div>GameBoard</div>

			<div id="players">
				<h2>Players active:</h2>
				<ul id="online-players">
					{Object.values(players.map((player, index) => (
						<li key={index}>
							<span className="user-icon">{player}</span>
						</li>
					)))}
				</ul>
			</div>

			{waiting && <p>Waiting for player...</p>}
			
			<Battleboard />

			{!waiting && <p>Game is starting!</p>}
		</>
	)
}

export default GameBoard