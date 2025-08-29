function Paginatino({ currentPage, totalPageNumber, onChangePage }) {
	const createButtons = () => {
		const buttons = Array.from({ length: totalPageNumber }).map((_, index) => {
			const numberPage = index + 1
			const button = (
				<button
					key={index}
					type="button"
					className={`px-3 py-1 rounded mx-1 border transition-colors ${
						numberPage === currentPage
							? 'bg-cyan-500 text-white border-cyan-500'
							: 'bg-white text-gray-800 border-gray-300 hover:bg-cyan-100'
					}`}
					onClick={() => onChangePage(numberPage)}
				>
					{numberPage}
				</button>
			)
			return button
		})
		return buttons
	}

	return (
		<div className="flex items-center justify-center gap-0.5 mt-8">
			{totalPageNumber > 1 ? (
				<button
					type="button"
					disabled={currentPage === 1}
					onClick={() => onChangePage(currentPage - 1)}
					className={`px-4 py-1 rounded border mr-2 transition-colors ${
						currentPage === 1
							? 'bg-gray-200 text-gray-400 border-gray-200 cursor-default'
							: 'bg-white text-gray-800 border-gray-300 hover:bg-cyan-100'
					}`}
				>
					Минула
				</button>
			) : null}
			{createButtons()}
			{totalPageNumber > 1 ? (
				<button
					type="button"
					disabled={currentPage === totalPageNumber}
					onClick={() => onChangePage(currentPage + 1)}
					className={`px-4 py-1 rounded border ml-2 transition-colors ${
						currentPage === totalPageNumber
							? 'bg-gray-200 text-gray-400 border-gray-200 cursor-default'
							: 'bg-white text-gray-800 border-gray-300 hover:bg-cyan-100'
					}`}
				>
					Наступна
				</button>
			) : null}
		</div>
	)
}

export default Paginatino
