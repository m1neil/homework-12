import { fetchPosts, fetchShowMorePosts } from '@/store/slices/postThunk'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostsList from './components/PostsList'

function PostsPageInfinityScroll() {
	const {
		postsList,
		currentPage,
		postsPerPage,
		totalPagesNumber,
		status,
		error,
	} = useSelector(state => state.posts)
	const dispatch = useDispatch()
	const currentPageRef = useRef(currentPage)
	const totalPagesNumberRef = useRef(totalPagesNumber)
	const isLoadingRef = useRef(status)

	console.log(postsList)

	useEffect(() => {
		currentPageRef.current = currentPage
		totalPagesNumberRef.current = totalPagesNumber
		isLoadingRef.current = status === 'loading'
	}, [currentPage, totalPagesNumber, status])

	useEffect(() => {
		dispatch(fetchPosts({ currentPage: 1, postsPerPage }))
		document.addEventListener('scroll', onScrollPosts)
		return () => document.removeEventListener('scroll', onScrollPosts)
	}, [])

	const onScrollPosts = () => {
		console.log('currentPage', currentPageRef.current)
		console.log('totalPagesNumberRef', totalPagesNumberRef.current)
		if (currentPageRef.current === totalPagesNumberRef.current) {
			document.removeEventListener('scroll', onScrollPosts)
			return
		} else if (isLoadingRef.current) return

		const currentPosition = scrollY + window.innerHeight
		const fullSiteHeight = document.documentElement.scrollHeight - 50

		if (currentPosition >= fullSiteHeight) {
			dispatch(
				fetchShowMorePosts({ offset: currentPageRef.current + 1, postsPerPage })
			)
		}
	}

	return (
		<div className="py-12">
			<div className="container mx-auto px-4">
				{postsList.length > 0 ? <PostsList postsList={postsList} /> : null}
				{status === 'loading' ? <div>Загрузка.....</div> : null}
				{status === 'error' ? <div>{error}</div> : null}
			</div>
		</div>
	)
}

export default PostsPageInfinityScroll
