import Gameboard from './Gameboard'
import { useEffect, useState } from 'react'

const Battleboard = ({ socket }) => {
	const [board, setBoard] = useState(Array(100).fill(null))

	const getRandomPosition = (array) => {

		let random = Math.floor(Math.random() * 100)
		if (array.length === 10) {
			if (array.indexOf(random) !== -1) {
				return ++random
			} else {
				return random
			}
		}

		if (array.length === 20) {
			if (array.indexOf(random) !== -1) {
				random++;
				if (array.indexOf(random) !== -1) {
					return ++random;
				}
			} else {
				return random
			}
		}

		if (array.length === 30) {
			if (array.indexOf(random) !== -1) {
				random++;
				if (array.indexOf(random) !== -1) {
					return ++random;
				}
				if (array.indexOf(random) !== -1) {
					return ++random;
				}
			} else {
				return random
			}
		}

	}
	
	const shipTwo = () => {
		const startPos = getRandomPosition([9, 19, 29, 39, 49, 59, 69, 79, 89, 99]);
		return [startPos, startPos + 1]
	}

	const shipThree = () => {
		 const startPos = getRandomPosition([8, 9, 18, 19, 28, 29, 38, 39, 48, 49, 58, 59, 68, 69, 78, 79, 88, 89, 98, 99]);
		return [startPos, startPos + 1, startPos + 2];
	}

	const shipFour = () => {
		const startPos = getRandomPosition([7, 8, 9, 17, 18, 19, 27, 28, 29, 37, 38, 39, 47, 48, 49, 57, 58, 59, 67, 68, 69, 77, 78, 79, 87, 88, 89, 97, 98, 99]);
		return [startPos, startPos + 1, startPos + 2, startPos + 3];
	}

	const setShips = () => {
		let isReady = true

		while (isReady) {
			let boardCopy = [...board]
			const shipTwo = shipTwo()
			if (boardCopy[shipTwo[0]] === null && boardCopy[shipTwo[1]] === null) {
				boardCopy[shipTwo[0]] = 'green'
				boardCopy[shipTwo[1]] = 'green'
			}

			let shipTwoCopy = shipTwo()
			if (boardCopy[shipTwoCopy[0]] === null && boardCopy[shipTwoCopy[1]] === null) {
				boardCopy[shipTwoCopy[0]] = 'green'
				boardCopy[shipTwoCopy[1]] = 'green'
			}

			let shipThree = shipThree()
			if (boardCopy[shipThree[0]] === null && boardCopy[shipThree[1]] === null) {
				boardCopy[shipThree[0]] = 'yellow'
				boardCopy[shipThree[1]] = 'yellow'
				boardCopy[shipThree[2]] = 'yellow'
			}

			let shipFour = shipFour()
			if (boardCopy[shipFour[0]] === null && boardCopy[shipFour[1]] === null) {
				boardCopy[shipFour[0]] = 'orange'
				boardCopy[shipFour[1]] = 'orange'
				boardCopy[shipFour[2]] = 'orange'
				boardCopy[shipFour[3]] = 'orange'
			}

			if (boardCopy[shipThree[0]] === 'yellow' && boardCopy[shipTwoCopy[0]] === 'green' && boardCopy[shipFour[0]] === 'orange') {
				setBoard(boardCopy)
				isReady = false
			}
		}
	}

	useEffect(() => {
		setShips()
	}, [])

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