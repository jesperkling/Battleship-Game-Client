import Gameboard from './Gameboard'
import { useEffect, useState } from 'react'
import '../assets/css/Battleboard.css'

const Battleboard = ({ socket }) => {
	const [board, setBoard] = useState(Array(100).fill(null))
	const [shipTwo, setShipTwo] = useState([])
	const [shipTwoSecond, setShipTwoSecond] = useState([])
	const [shipThree, setShipThree] = useState([])
	const [shipFour, setShipFour] = useState([])
	const [shipRemain, setShipRemain] = useState([])
	const [winner, setWinner] = useState('hide')

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
	
	const boatTwo = () => {
		const startPos = getRandomPosition([9, 19, 29, 39, 49, 59, 69, 79, 89, 99]);
		return [startPos, startPos + 1]
	}

	const boatThree = () => {
		 const startPos = getRandomPosition([8, 9, 18, 19, 28, 29, 38, 39, 48, 49, 58, 59, 68, 69, 78, 79, 88, 89, 98, 99]);
		return [startPos, startPos + 1, startPos + 2];
	}

	const boatFour = () => {
		const startPos = getRandomPosition([7, 8, 9, 17, 18, 19, 27, 28, 29, 37, 38, 39, 47, 48, 49, 57, 58, 59, 67, 68, 69, 77, 78, 79, 87, 88, 89, 97, 98, 99]);
		return [startPos, startPos + 1, startPos + 2, startPos + 3];
	}

	const setShips = () => {
		setShipRemain([1,2,3,4])
		let isReady = true

		while (isReady) {
			let boardCopy = [...board]
			const shipTwo1 = boatTwo()
			if (boardCopy[shipTwo1[0]] === null && boardCopy[shipTwo1[1]] === null) {
				boardCopy[shipTwo1[0]] = 'ship2'
				boardCopy[shipTwo1[1]] = 'ship2'
			}

			let shipTwo2 = boatTwo()
			if (boardCopy[shipTwo2[0]] === null && boardCopy[shipTwo2[1]] === null) {
				boardCopy[shipTwo2[0]] = 'ship2Second'
				boardCopy[shipTwo2[1]] = 'ship2Second'
			}

			let ship3 = boatThree()
			if (boardCopy[ship3[0]] === null && boardCopy[ship3[1]] === null) {
				boardCopy[ship3[0]] = 'ship3'
				boardCopy[ship3[1]] = 'ship3'
				boardCopy[ship3[2]] = 'ship3'
			}

			let ship4 = boatFour()
			if (boardCopy[ship4[0]] === null && boardCopy[ship4[1]] === null) {
				boardCopy[ship4[0]] = 'ship4'
				boardCopy[ship4[1]] = 'ship4'
				boardCopy[ship4[2]] = 'ship4'
				boardCopy[ship4[3]] = 'ship4'
			}

			if (boardCopy[ship3[0]] === 'yellow' && boardCopy[shipTwo2[0]] === 'green' && boardCopy[ship4[0]] === 'orange') {
				setShipTwo([ shipTwo1[0], shipTwo1[1]])
				setShipTwoSecond([shipTwo2[0], shipTwo2[1]])
				setShipThree([ship3[0], ship3[1], ship3[2]])
				setShipFour([ship4[0], ship4[1], ship4[2], ship4[3]])
				setBoard(boardCopy)
				isReady = false
			}
		}
	}

	useEffect(() => {
		setShips()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleClick = (i) => {
		const boardCopy = [...board]

		if (boardCopy[i] !== null) {

			if (boardCopy[i] === 'ship3') {
				boardCopy[i] = 'hitShip'
				const index = shipThree.indexOf(i)
				shipThree.splice(index, 1)
				if(shipThree.length === 0) {
					shipRemain.pop()
				}
			}

			if (boardCopy[i] === 'ship4') {
				boardCopy[i] = 'hitShip'
				const index = shipFour.indexOf(i)
				shipFour.splice(index, 1)
				if(shipFour.length === 0) {
					shipRemain.pop()
				}
			}

			if (boardCopy[i] === 'ship2') {
				boardCopy[i] = 'hitShip'
				const index = shipTwo.indexOf(i)
				shipTwo.splice(index, 1)
				if(shipTwo.length === 0) {
					shipRemain.pop()
				}
			}

			if (boardCopy[i] === 'ship2Second') {
				boardCopy[i] = 'hitShip'
				const index = shipTwoSecond.indexOf(i)
				shipTwoSecond.splice(index, 1)
				if(shipTwoSecond.length === 0) {
					shipRemain.pop()
				}
			}

			if (shipRemain.length === 0) {
				setWinner('winner')
			}

		} else {
			boardCopy[i] = 'missShip'
		}
		setBoard(boardCopy)
	}

	return (
		<>
			<div className='game-container'>
				<div className='game-board game-board-you'>
					<h3 className='game-title game-title-you'>You</h3>
					<p className={winner}>Congratulation, You Won!</p>
					<p className='ships-remain-text'>Ships left: <span>{shipRemain.length}</span></p>
					<div className='game-wrapper game-wrapper-you'>
						<Gameboard squares={board} onClick={handleClick} />
					</div>
				</div>
			</div>
		</>
	)
}

export default Battleboard