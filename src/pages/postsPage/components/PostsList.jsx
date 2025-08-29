import { useDispatch, useSelector } from 'react-redux'
import PostItem from './PostItem'
import { useCallback, useRef } from 'react'
import { removePost } from '@/store/slices/postThunk'

function PostsList({ postsList }) {
	const { errorRemovePost } = useSelector(state => state.posts)
	const dispatch = useDispatch()
	const idRefRemovingPost = useRef(null)

	const onDelete = useCallback(idPost => {
		idRefRemovingPost.current = idPost
		dispatch(removePost(idPost))
	}, [])

	const createPostsList = () => {
		const items = postsList.map(post => (
			<PostItem
				key={post.id}
				postData={post}
				onDelete={onDelete}
				isDeleting={post.id === idRefRemovingPost.current}
			/>
		))
		return (
			<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{items}
			</div>
		)
	}

	return (
		<>
			{postsList.length ? (
				createPostsList()
			) : (
				<div className="text-center text-gray-500 py-8">
					Постов на этой странице нет
				</div>
			)}
			{errorRemovePost ? (
				<div className="text-red-600 font-semibold">
					Ну адолось удалить пост!
				</div>
			) : null}
		</>
	)
}

export default PostsList
