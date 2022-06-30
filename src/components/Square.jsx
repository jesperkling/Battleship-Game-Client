const Square = ({ value, onClick }) => {
	return (
		<div className={`box ${value}`} onClick={onClick} style={{backgroundColor:value}}></div>
	)
}

export default Square