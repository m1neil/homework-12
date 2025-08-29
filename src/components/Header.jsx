import { Link, NavLink } from 'react-router'
import { routes } from '../router'

function Header() {
	const menu = routes[0].children
		.filter(route => route?.handler?.title)
		.map(item => ({ path: item.path, title: item.handler.title }))

	return (
		<header className="bg-gray-900 text-white py-4">
			<div className="container mx-auto flex items-center justify-between px-4">
				<Link
					to="/"
					className="text-xl font-bold tracking-wide hover:text-cyan-400 transition-colors"
				>
					Logo
				</Link>
				<nav>
					<ul className="flex gap-6">
						{menu.map((route, index) => (
							<NavLink
								key={index}
								to={route.path}
								className={({ isActive }) =>
									`font-medium hover:text-cyan-400 transition-colors ${
										isActive ? 'text-cyan-400' : ''
									}`
								}
							>
								{route.title}
							</NavLink>
						))}
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
