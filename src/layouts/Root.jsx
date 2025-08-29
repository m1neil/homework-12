import { Outlet } from 'react-router'
import Header from '../components/Header'

function Root() {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	)
}

export default Root
