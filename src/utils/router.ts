import { useBrowserLocation } from 'wouter/use-browser-location'

/**
 * 扩展 wouter 默认的 useLocation hook
 * - 如果当前 url 包含调试用参数，则始终保留这些参数
 *
 * @note wouter 比较简陋，好在容易扩展
 * @note 该库 ts 类型错误比较多，只能用 any 覆盖
 * @note 该库的 Link/Redirect/setLocation 都没有办法用 ../ 回到上级，只能用绝对路径
 * @note 该库没有提供 setSearchParams，考虑自行实现或者换成 react router
 */
export const useLocationWithDevParams = (opts = {}) => {
	const [u, n] = useBrowserLocation()
	return [
		u,
		(to: string, { replace = false, state = null } = {}) => {
			n(keepDevUrl(to), { replace, state })
		},
	] as any
}

function keepDevUrl(pathname: string) {
	const search = new URLSearchParams(window.location.search)

	const useVite = search.get('useVite')
	const assetVersion = search.get('assetVersion')
	const localPort = search.get('localPort')

	const searchParams = {} as Record<string, string>

	if (useVite) searchParams.useVite = useVite
	if (assetVersion) searchParams.assetVersion = assetVersion
	if (localPort) searchParams.localPort = localPort

	return addSearchParams(pathname, searchParams)
}

function addSearchParams(pathname: string, searchParams: Record<string, string>) {
	const url = new URL(pathname, 'http://localhost')
	const params = new URLSearchParams(url.search)
	for (const key in searchParams) {
		params.set(key, searchParams[key])
	}

	const search = params.toString()
	if (search) {
		return url.pathname + '?' + params.toString() + url.hash
	} else {
		return url.pathname + url.hash
	}
}
