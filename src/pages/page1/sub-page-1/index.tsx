import styles from './index.module.css'

export default function SubPage1() {
	return (
		<div className={styles.wrapper + ` ${WATERMARK_CLASS}`}>
			<div className={styles.innerWrapper}>
				<h2>Sub Page 1</h2>
				<p>This is a sub page 1.</p>
			</div>
		</div>
	)
}
