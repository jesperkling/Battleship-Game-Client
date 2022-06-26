import Gameboard from './Gameboard'
import { useEffect, useState } from 'react'

const Battleboard = ({ socket }) => {
	const [board, setBoard] = useState(Array(100).fill(null))

	const handleClick = (i) => {
		const boardCopy = [...board]
		boardCopy[i] = 'lightblue'
		setBoard(boardCopy)
	}

	return (
		<>
			<div className='game-container'>
				<div className='game-board game-board-you'>
					<h3 className='game-title game-title-you'>You</h3>
					<div className='game-wrapper game-wrapper-you'>
						<Gameboard squares={board} onClick={handleClick} />
					</div>
				</div>

			</div>
		</>
	)
}

export default Battleboard