import { useDispatch, useSelector } from 'react-redux'
import PostsList from './components/PostsList'
import { useEffect } from 'react'
import { fetchPosts, fetchShowMorePosts } from '@/store/slices/postThunk'

function PostsPageShowMore() {
	const {
		postsList,
		currentPage,
		postsPerPage,
		totalPagesNumber,
		status,
		error,
	} = useSelector(state => state.posts)
	const dispatch = useDispatch()
	const isLoading = status === 'loading'

	useEffect(() => {
		dispatch(fetchPosts({ currentPage: 1, postsPerPage }))
	}, [])

	const onShowMorePosts = () => {
		dispatch(fetchShowMorePosts({ offset: currentPage + 1, postsPerPage }))
	}

	return (
		<div className="py-12">
			<div className="container mx-auto px-4">
				{postsList.length > 0 && status !== 'error' ? (
					<PostsList postsList={postsList} />
				) : null}
				{status === 'loading' ? <div>Загрузка.....</div> : null}
				{status === 'error' ? <div>{error}</div> : null}
				{currentPage !== totalPagesNumber ? (
					<button
						onClick={onShowMorePosts}
						disabled={isLoading}
						className={`mt-8 relative left-3/6 -translate-x-1/2 flex items-center gap-2 px-6 py-2 font-semibold rounded shadow transition-colors ${
							isLoading
								? 'bg-gray-300 text-gray-500 cursor-not-allowed'
								: 'bg-cyan-500 hover:bg-cyan-600 text-white'
						}`}
					>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 4v16m8-8H4"
							/>
						</svg>
						Show more
					</button>
				) : null}
			</div>
		</div>
	)
}

export default PostsPageShowMore
