/**
 * 可收起的侧边栏，有一个收起按钮
 */
import classNames from 'classnames'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'wouter'

import styles from './index.module.css'

interface MenuItem {
	label: React.ReactNode
	icon: React.ReactNode
	href: string
}

interface SideNavProps {
	menuItems: MenuItem[]
}

export default function SideNav(props: SideNavProps) {
	const isSmallScreen = window.innerWidth < 1100
	const [isCollapsed, setIsCollapsed] = useState(isSmallScreen)

	// 垃圾 wouter 这种简单的事情都干不了
	const [location] = useLocation()
	const isActive = useMemo(() => {
		return props.menuItems.map(({ href }) => location.startsWith(href))
	}, [location, props.menuItems])

	// 监听窗口宽度变化，自动展开/收起
	useEffect(() => {
		const handleResize = () => {
			setIsCollapsed(window.innerWidth < 1100)
		}
		window.addEventListener('resize', handleResize)
		handleResize()
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div className={classNames(styles.wrapper, isCollapsed && styles.collapsed)}>
			<nav className={styles.nav}>
				<ul role="menu">
					{props.menuItems.map((menuItem, index) => (
						<Link
							role="menuitem"
							href={menuItem.href}
							key={index}
							// className={(active) => (active ? styles.active : '')}>
							className={isActive[index] ? styles.active : ''}>
							<div className={styles.menuItem}>
								<div className={styles.iconWrapper}>{menuItem.icon}</div>
								<div className={styles.labelWrapper}>{menuItem.label}</div>
							</div>
						</Link>
					))}
				</ul>
			</nav>

			<button
				aria-label="hide sidebar"
				className={styles.collapseButton}
				onClick={() => setIsCollapsed(!isCollapsed)}></button>
		</div>
	)
}
