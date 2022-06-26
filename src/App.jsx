import { Routes, Route } from 'react-router-dom'
import GameBoard from './pages/GameBoard'
import NotFound from './pages/NotFound'
import StartPage from './pages/StartPage'
import './App.css';


function App() {
	return (
		<div id='App'>
			<Routes>
				<Route path="/" element={<StartPage />} />
				<Route path="/games/:game_id" element={<GameBoard />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App;
