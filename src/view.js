import './view.scss'

/**
 * Frontend behaviour for the floating icon rail.
 *
 * Two optional features, both off unless enabled in the Customizer:
 *  - "Show After Scrolling" reveals the rail once the visitor has scrolled past
 *    the configured offset (`data-scroll-offset`).
 *  - "Collapse Behind A Button" hides the list behind a toggle button.
 *
 * No jQuery, no dependencies.
 */

const WRAPPER_ID = 'gf_social_icons__wrapper'
const VISIBLE_CLASS = 'gf-is-visible'
const OPEN_CLASS = 'is--open'

function initScrollReveal(wrapper) {
	if (!wrapper.classList.contains('is--scroll-reveal')) {
		return
	}

	const offset = parseInt(wrapper.getAttribute('data-scroll-offset'), 10) || 0
	let ticking = false

	const update = () => {
		ticking = false
		const scrolled = window.pageYOffset || document.documentElement.scrollTop || 0
		wrapper.classList.toggle(VISIBLE_CLASS, scrolled >= offset)
	}

	const onScroll = () => {
		// requestAnimationFrame never fires while the tab is in the background,
		// so fall back to updating straight away when it is unavailable.
		if (document.hidden || typeof window.requestAnimationFrame !== 'function') {
			update()
			return
		}

		if (!ticking) {
			ticking = true
			window.requestAnimationFrame(update)
		}
	}

	window.addEventListener('scroll', onScroll, { passive: true })
	window.addEventListener('resize', onScroll, { passive: true })
	document.addEventListener('visibilitychange', update)
	update()
}

function initToggle(wrapper) {
	const button = wrapper.querySelector('.gf_social_icons_toggle')

	if (!button || !wrapper.classList.contains('has--toggle')) {
		return
	}

	const setOpen = (open) => {
		wrapper.classList.toggle(OPEN_CLASS, open)
		button.setAttribute('aria-expanded', open ? 'true' : 'false')
	}

	button.addEventListener('click', () => {
		setOpen(!wrapper.classList.contains(OPEN_CLASS))
	})

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && wrapper.classList.contains(OPEN_CLASS)) {
			setOpen(false)
			button.focus()
		}
	})

	document.addEventListener('click', (event) => {
		if (wrapper.classList.contains(OPEN_CLASS) && !wrapper.contains(event.target)) {
			setOpen(false)
		}
	})
}

function init() {
	const wrapper = document.getElementById(WRAPPER_ID)

	if (!wrapper) {
		return
	}

	initScrollReveal(wrapper)
	initToggle(wrapper)
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init)
} else {
	init()
}
