const meta = document.querySelector('meta[name="microdata"]')

const content = meta?.getAttribute('content')
const userInfo = content?.split(';').reduce(
	(acc, cur) => {
		const [key, value] = cur.split('=')
		acc[key] = value
		return acc
	},
	{} as Record<string, string>
)

export const WORK_ID = userInfo?.workID ?? '0'
export const NICK_NAME = userInfo?.nickName ?? '未登陆'
