import { FC } from 'react'
import styles from './CatControls.module.scss'

interface CatControlsProps {
	enabled: boolean
	autoRefresh: boolean
	onEnabledChange: (enabled: boolean) => void
	onAutoRefreshChange: (autoRefresh: boolean) => void
	onGetCat: () => void
}

export const CatControls: FC<CatControlsProps> = ({
	enabled,
	autoRefresh,
	onEnabledChange,
	onAutoRefreshChange,
	onGetCat,
}) => {
	return (
		<div className={styles.controls}>
			<label className={styles.checkbox}>
				<input
					type='checkbox'
					checked={enabled}
					onChange={e => onEnabledChange(e.target.checked)}
				/>
				<span>Enabled</span>
			</label>

			<label className={styles.checkbox}>
				<input
					type='checkbox'
					checked={autoRefresh}
					onChange={e => onAutoRefreshChange(e.target.checked)}
				/>
				<span>Auto-refresh every 5 second</span>
			</label>

			<button className={styles.button} onClick={onGetCat} disabled={!enabled}>
				Get cat
			</button>
		</div>
	)
}
