import { Routes, Route } from 'react-router-dom'
import socketio from 'socket.io-client'
import GameBoard from './pages/GameBoard'
import NotFound from './pages/NotFound'
import StartPage from './pages/StartPage'
import './App.css';

const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL)

const App = () => {
	console.log(socket)
	return (
		<div id='App'>
			<Routes>
				<Route path='/' element={<StartPage />} />
				<Route  path='/games/:game_id' element={<GameBoard />} />
				<Route  path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App;
