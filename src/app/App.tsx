import classNames from 'classnames'
import { useState } from 'react'
import { Link, Redirect, Route, Router, Switch, useLocation } from 'wouter'

import NotFound from '@/components/NotFound/NotFound'
import Page1 from '@/pages/page1'
import { useLocationWithDevParams } from '@/utils/router'

import styles from './App.module.css'

export default function App() {
	const [location] = useLocation()

	return (
		<Router hook={useLocationWithDevParams}>
			<div className={styles.wrapper}>
				{/* 导航栏 */}
				<header className={styles.header}>
					<Link href="/" className={styles.brand}>
						<img className={styles.logo} src="/vite.svg" alt="logo" loading="lazy" />
						<h1>Title</h1>
					</Link>
					<nav className={styles.nav}>
						<ul>
							<li className={classNames(location.startsWith('/page1') ?? styles.active)}>
								<Link href="/page1" aria-disabled>
									Page 1
								</Link>
							</li>
							<li className={classNames(location.startsWith('/page2') ?? styles.active)}>
								<Link href="/page2" aria-disabled>
									Page 2
								</Link>
							</li>
							<li className={classNames(location.startsWith('/page3') ?? styles.active)}>
								<Link href="/page3" aria-disabled>
									Page 3
								</Link>
							</li>
						</ul>
					</nav>
					<div className={styles.sep}></div>
					{/* 帮助 */}
					<div className={styles.help}>
						<a href="#" target="_blank" rel="noreferrer">
							<img src="/help.svg" alt="help" loading="lazy" />
						</a>
					</div>
					{/* 头像 */}
					<div className={styles.user}>
						<img src="/avatar.svg" alt="avatar" loading="lazy" />
					</div>
				</header>
				{/* main */}
				<main className={styles.main}>
					<Switch>
						<Route nest path="/page1">
							<Page1 />
						</Route>

						<Route nest path="/page2">
							<NotFound />
						</Route>

						<Route nest path="/page3">
							<NotFound />
						</Route>

						{/* 如果没有首页，则自动跳转 */}
						<Route nest path="/">
							<Redirect to="/page1" />
						</Route>

						{/* 404 */}
						<Route>
							<NotFound />
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	)
}
