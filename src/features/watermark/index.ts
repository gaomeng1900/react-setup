import { NICK_NAME, WORK_ID } from '@/utils/user'

function getWatermarkBase64(scale = 1, opacity = 0.08, noise = false) {
	const canvas = document.createElement('canvas')
	canvas.width = 150
	canvas.height = 100
	const ctx = canvas.getContext('2d')!
	ctx.save()
	ctx.font = `${12 * scale}px sans-serif`
	ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	ctx.rotate(-0.2617)
	ctx.fillText(`${NICK_NAME} (${WORK_ID})`, 50, 50)

	// if (noise) {
	// 	ctx.restore()
	// 	for (let i = 0; i < 150; i++) {
	// 		for (let j = 0; j < 100; j++) {
	// 			if (Math.random() < 0.5) {
	// 				ctx.fillStyle = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${opacity})`
	// 				ctx.fillRect(i, j, 1, 1)
	// 			}
	// 		}
	// 	}
	// }

	return canvas.toDataURL()
}

setTimeout(() => {
	const style = document.createElement('style')
	style.innerHTML = /* css */ `
.${WATERMARK_CLASS}::after {
	content: '';
	position: absolute;
	z-index: 999;

	top: 0;
	left: 0;
	/* width: 100%; */
	width: calc(100% - 30px);
	height: 100%;
	/* height: calc(100% - 30px); */

	/* background-position: 50px 50px; */
	background-position: 30px 30px;

	/* top: 50px;
	left: 50px;
	width: calc(100% - 100px);
	height: calc(100% - 100px); */

	pointer-events: none;

	background-image: url(${getWatermarkBase64()});
	background-repeat: repeat;
}
	`
	document.head.appendChild(style)

	// 如果 style 元素被用户删除，则自动加回去
	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type === 'childList') {
				for (const node of mutation.removedNodes) {
					if (node === style) {
						document.head.appendChild(style)
						break
					}
				}
			}
		}
	})
	observer.observe(document.head, { childList: true })

	setTimeout(() => {
		const styleHidden = document.createElement('style')
		styleHidden.innerHTML = /* css */ `
body::after {
	content: '';
	position: fixed;
	z-index: 99999;

	top: 0;
	left: 0;
	width: calc(99vw + 1vw);
	height: calc(99vh + 1vh);

	background-position: 30px 30px;
	background-size: 300px 200px;

	pointer-events: none;

	background-image: url(${getWatermarkBase64(1.5, 0.005, false)});
	background-repeat: repeat;
}
		`
		document.head.appendChild(styleHidden)

		// 如果 styleHidden 元素被用户删除，则自动加回去
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type === 'childList') {
					for (const node of mutation.removedNodes) {
						if (node === styleHidden) {
							document.head.appendChild(styleHidden)
							break
						}
					}
				}
			}
		})
		observer.observe(document.head, { childList: true })
	}, 700)
}, 500)
