'use client'

import { FC, useCallback, useEffect, useState } from 'react'
import { CatCard } from '../CatCard/CatCard'
import { CatControls } from '../CatControls/CatControls'
import styles from './CatContainer.module.scss'

export const CatContainer: FC = () => {
	const [enabled, setEnabled] = useState(true)
	const [autoRefresh, setAutoRefresh] = useState(false)
	const [imageUrl, setImageUrl] = useState('')

	const fetchCat = useCallback(async () => {
		if (!enabled) return

		try {
			const response = await fetch('https://api.thecatapi.com/v1/images/search')
			const [data] = await response.json()
			setImageUrl(data.url)
		} catch (error) {
			console.error('Error fetching cat:', error)
		}
	}, [enabled])

	useEffect(() => {
		// Загружаем изображение при первом рендере
		fetchCat()
	}, [fetchCat])

	useEffect(() => {
		if (autoRefresh && enabled) {
			const interval = setInterval(fetchCat, 5000)
			return () => clearInterval(interval)
		}
	}, [autoRefresh, enabled, fetchCat])

	return (
		<div className={styles.container}>
			<CatCard imageUrl={imageUrl} />
			<CatControls
				enabled={enabled}
				autoRefresh={autoRefresh}
				onEnabledChange={setEnabled}
				onAutoRefreshChange={setAutoRefresh}
				onGetCat={fetchCat}
			/>
		</div>
	)
}
