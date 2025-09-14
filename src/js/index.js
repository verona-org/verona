/* const img = document.querySelector(".animatedImage")

let animationId
let startTime
const breathDuration = 3000
let lastPosition = 0
const minAmp = 0.95
const maxAmp = 1.1

function animate(timestamp) {
	if (!startTime) startTime = timestamp
	const elapsed = timestamp - startTime
	// Вычисляем прогресс анимации (0-1)
	const progress = (elapsed % breathDuration) / breathDuration

	const breathingFactor = Math.sin(progress * Math.PI * 2)

	// Преобразуем в диапазон масштабирования
	const scale = minAmp + ((maxAmp - minAmp) * (breathingFactor + 1)) / 2

	// Применяем изменения
	img.style.transform = `scale(${scale})`

	animationId = requestAnimationFrame(animate)
}

// Запуск анимации
animationId = requestAnimationFrame(animate) */


