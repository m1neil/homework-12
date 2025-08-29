import { memo } from 'react'

function PostItem({ postData, onDelete, isDeleting }) {
	const { id, title, body, authorId, likesNumber, dislikesNumber } = postData

	return (
		<article
			className={`bg-white rounded-lg shadow p-6 border border-gray-200 flex flex-col items-start transition-opacity duration-300 ${
				isDeleting ? 'opacity-60 pointer-events-none' : ''
			}`}
		>
			<h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
			<div className="text-gray-700 mb-4 grow">{body}</div>
			<div className="flex items-center justify-between gap-6 mb-4 text-sm text-gray-600">
				<div>
					👍 Лайки:{' '}
					<span className="font-medium text-green-600">{likesNumber}</span>
				</div>
				<div>
					👎 Дизлайки:{' '}
					<span className="font-medium text-red-600">{dislikesNumber}</span>
				</div>
				<div>
					✍️ Автор: <span className="font-medium">{authorId}</span>
				</div>
			</div>
			<button
				type="button"
				disabled={isDeleting}
				onClick={() => onDelete(id)}
				className={`px-4 py-2 rounded transition-colors font-medium
					${
						isDeleting
							? 'bg-gray-300 text-gray-500 cursor-not-allowed'
							: 'bg-red-500 hover:bg-red-600 text-white'
					}
				`}
			>
				Видалити
			</button>
		</article>
	)
}

export default memo(PostItem)
