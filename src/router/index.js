import Root from '@/layouts/Root'
import Home from '@/pages/Home'
import PostsPage from '@/pages/postsPage'
import PostsPageInfinityScroll from '@/pages/postsPage/PostsPageInfinityScroll'
import PostsPageShowMore from '@/pages/postsPage/PostsPageShowMore'
import { createBrowserRouter } from 'react-router'

export const routes = [
	{
		path: '',
		Component: Root,
		children: [
			{
				path: '/',
				Component: Home,
				handler: {
					title: 'Home',
				},
			},
			{
				path: '/posts',
				Component: PostsPage,
				handler: {
					title: 'Posts',
				},
			},
			{
				path: '/posts-show-more',
				Component: PostsPageShowMore,
				handler: {
					title: 'Posts show more',
				},
			},
			{
				path: '/posts-infinity-scroll',
				Component: PostsPageInfinityScroll,
				handler: {
					title: 'Posts infinity scroll',
				},
			},
		],
	},
]

const router = createBrowserRouter(routes)

export default router
