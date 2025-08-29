import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '@/store/slices/postThunk'

function PostForm() {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [authorId, setIdAuthor] = useState('')
	const [error, setError] = useState(null)
	const dispatch = useDispatch()
	const { statusAddPost } = useSelector(state => state.posts)

	const sendNewPost = e => {
		e.preventDefault()
		if (!title.trim() || !body.trim() || !authorId.trim()) {
			setError('Не все поля заполнены!')
			return
		} else setError(null)

		dispatch(
			addPost({
				authorId: authorId.trim(),
				title: title.trim(),
				body: body.trim(),
				likesNumber: 0,
				dislikesNumber: 0,
				createdAt: new Date().toJSON(),
			})
		)

		setTitle('')
		setBody('')
		setIdAuthor('')
	}

	return (
		<form
			onSubmit={sendNewPost}
			className="bg-white rounded-lg shadow p-6 mb-8 border border-gray-200"
		>
			<div className="mb-4">
				<label
					htmlFor="title"
					className="inline-block text-gray-700 font-medium mb-1"
				>
					Заголовок:
				</label>
				<input
					value={title}
					type="text"
					name="title"
					id="title"
					onChange={e => setTitle(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="text"
					className="inline-block text-gray-700 font-medium mb-1"
				>
					Текст поста:
				</label>
				<textarea
					value={body}
					name="text"
					id="text"
					onChange={e => setBody(e.target.value)}
					className="w-full px-3 min-h-[155px] resize-none py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
				></textarea>
			</div>
			<div className="mb-4">
				<label
					htmlFor="id-author"
					className="inline-block text-gray-700 font-medium mb-1"
				>
					ID Автора:
				</label>
				<input
					value={authorId}
					type="text"
					name="id-author"
					id="id-author"
					onChange={e => setIdAuthor(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
				/>
			</div>
			{error && (
				<div className="text-red-600 mb-4 font-semibold text-[18px]">
					{error}
				</div>
			)}
			<button
				disabled={statusAddPost === 'loading'}
				type="submit"
				className={`w-full py-2 px-4 font-semibold rounded transition-colors
					${
						statusAddPost === 'loading'
							? 'bg-gray-300 text-gray-500 cursor-not-allowed'
							: 'bg-cyan-500 hover:bg-cyan-600 text-white'
					}
				`}
			>
				Добавить пост
			</button>
		</form>
	)
}

export default PostForm
