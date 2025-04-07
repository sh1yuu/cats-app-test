import { FC, useEffect, useState } from 'react'
import styles from './CatCard.module.scss'

interface CatCardProps {
	imageUrl: string
}

export const CatCard: FC<CatCardProps> = ({ imageUrl }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)

	const handleImageLoad = () => {
		setIsLoading(false)
		setHasError(false)
	}

	const handleImageError = () => {
		setIsLoading(false)
		setHasError(true)
	}

	useEffect(() => {
		if (imageUrl) {
			setIsLoading(true)
			setHasError(false)
		}
	}, [imageUrl])

	return (
		<div className={styles.card}>
			<div className={styles.imageWrapper}>
				{imageUrl && (
					<img
						src={imageUrl}
						alt='Cat'
						className={`${styles.image} ${isLoading ? styles.loading : ''}`}
						onLoad={handleImageLoad}
						onError={handleImageError}
						loading='lazy'
					/>
				)}
				{isLoading && (
					<div className={styles.loader}>
						<div className={styles.spinner}></div>
					</div>
				)}
			</div>
			{hasError && <div className={styles.error}>Failed to load image</div>}
		</div>
	)
}
