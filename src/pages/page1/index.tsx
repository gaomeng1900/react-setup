import { Redirect, Route, Switch } from 'wouter'

import SubPage1 from './sub-page-1'
import NotFound from '@/components/NotFound/NotFound'
import SideNav from '@/components/SideNav'

import styles from './index.module.css'

export default function Page1() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.sidebar}>
				<SideNav
					menuItems={[
						{ label: 'Sub 1', icon: '🌟', href: '/sub-page-1' },
						{ label: 'Sub 2', icon: '🌍', href: '/sub-page-2' },
						{ label: 'Sub 3', icon: '🌌', href: '/sub-page-3' },
					]}
				/>
			</div>
			<main className={styles.main}>
				<div className={styles.mainInner}>
					<Switch>
						<Route nest path="/sub-page-1">
							<SubPage1 />
						</Route>
						<Route nest path="/sub-page-2">
							<NotFound />
						</Route>
						<Route nest path="/sub-page-3">
							<NotFound />
						</Route>

						{/* 自动跳转到 overview */}
						<Route path="/">
							<Redirect to="/sub-page-1" />
						</Route>

						{/* 404 */}
						<Route>
							<NotFound />
						</Route>
					</Switch>
				</div>
			</main>
		</div>
	)
}
