import { useDispatch, useSelector } from 'react-redux'
import PostsList from './components/PostsList'
import { useEffect } from 'react'
import { fetchPosts } from '@/store/slices/postThunk'
import Paginatino from '@/components/Pagination'
import { setCurrentPage } from '@/store/slices/postsSlice'
import PostForm from './components/PostForm'

function PostsPage() {
	const {
		postsList,
		currentPage,
		postsPerPage,
		totalPagesNumber,
		status,
		error,
	} = useSelector(state => state.posts)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchPosts({ currentPage, postsPerPage }))
	}, [currentPage, postsPerPage])

	const onChangePage = numberPage => {
		if (status === 'loading') return
		dispatch(setCurrentPage(numberPage))
	}

	return (
		<div className="py-12">
			<div className="container mx-auto px-4">
				<PostForm />
				{postsList.length > 0 && <PostsList postsList={postsList} />}
				{status === 'loading' ? <div>Загрузка.....</div> : null}
				{status === 'error' ? <div>{error}</div> : null}
				{postsList.length > 0 ? (
					<Paginatino
						currentPage={currentPage}
						totalPageNumber={totalPagesNumber}
						onChangePage={onChangePage}
					/>
				) : null}
			</div>
		</div>
	)
}

export default PostsPage
