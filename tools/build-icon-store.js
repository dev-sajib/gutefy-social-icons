/**
 * Regenerates src/iconStore.json.
 *
 * Icon artwork comes from Font Awesome Free (brands), which is licensed CC BY 4.0.
 * Run after adding an entry to NEW_ICONS or changing a brand colour:
 *
 *     npm run build:icons
 *
 * Existing entries keep their stored SVG untouched; only missing icons are added and
 * the brand colour is refreshed for every entry. Pass --prune to drop entries that are
 * neither in NEW_ICONS nor in KEEP.
 */

const fs = require('fs')
const path = require('path')
const brands = require('@fortawesome/free-brands-svg-icons')
const solid = require('@fortawesome/free-solid-svg-icons')

const STORE = path.resolve(__dirname, '..', 'src', 'iconStore.json')
const FA_VERSION = require('@fortawesome/free-brands-svg-icons/package.json').version
const LICENSE = `<!--!Font Awesome Free ${FA_VERSION} by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->`

/** Icons added by this script: store key -> Font Awesome export name. */
const NEW_ICONS = {
	tumblr: 'faTumblr',
	discord: 'faDiscord',
	github: 'faGithub',
	vimeo: 'faVimeoV',
	twitch: 'faTwitch',
	behance: 'faBehance',
	dribbble: 'faDribbble',
	threads: 'faThreads',
	bluesky: 'faBluesky',
	mastodon: 'faMastodon',
	signal: 'faSignalMessenger',
	viber: 'faViber',
	line: 'faLine',
	spotify: 'faSpotify',
	slack: 'faSlack',
	yelp: 'faYelp',
}

/** Non-brand icons: store key -> Font Awesome Free Solid export name. */
const SOLID_ICONS = {
	link: 'faLink',
}

/** Entries that ship with hand-kept artwork (solid/regular icons, not brands). */
const KEEP = ['envelope', 'envelope-regular', 'phone']

/**
 * Official brand colour per icon, used when "Use brand colours" is enabled.
 * Non-brand icons get a neutral tone.
 */
const BRAND_COLORS = {
	'envelope': '#6b7280',
	'envelope-regular': '#6b7280',
	'phone': '#16a34a',
	'facebook': '#1877f2',
	'facebook_f': '#1877f2',
	'square_facebook': '#1877f2',
	'facebook_messenger': '#00b2ff',
	'whatsapp': '#25d366',
	'square_whatsapp': '#25d366',
	'x_twitter': '#000000',
	'square_x_twitter': '#000000',
	'linkedin': '#0a66c2',
	'linkedin_in': '#0a66c2',
	'telegram': '#26a5e4',
	'skype': '#00aff0',
	'instagram': '#e4405f',
	'square_instagram': '#e4405f',
	'pinterest': '#bd081c',
	'pinterest_p': '#bd081c',
	'snapchat': '#fffc00',
	'square_snapchat': '#fffc00',
	'tiktok': '#000000',
	'youtube': '#ff0000',
	'square_youtube': '#ff0000',
	'reddit': '#ff4500',
	'reddit_alien': '#ff4500',
	'square_reddit': '#ff4500',
	'tumblr': '#36465d',
	'discord': '#5865f2',
	'github': '#181717',
	'vimeo': '#1ab7ea',
	'twitch': '#9146ff',
	'behance': '#1769ff',
	'dribbble': '#ea4c89',
	'threads': '#000000',
	'bluesky': '#0285ff',
	'mastodon': '#6364ff',
	'signal': '#3a76f0',
	'viber': '#7360f2',
	'line': '#06c755',
	'spotify': '#1db954',
	'slack': '#4a154b',
	'yelp': '#d32323',
	'link': '#6b7280',
}

function toSvg(faName, set) {
	const def = (set || brands)[faName]
	if (!def) {
		throw new Error(`Font Awesome icon not found: ${faName}`)
	}
	const [width, height, , , pathData] = def.icon
	const d = Array.isArray(pathData) ? pathData.join('') : pathData
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">${LICENSE}<path d="${d}"/></svg>`
}

const store = JSON.parse(fs.readFileSync(STORE, 'utf8'))
const prune = process.argv.includes('--prune')
let added = 0
let recoloured = 0
let removed = 0

for (const [key, faName] of Object.entries(NEW_ICONS)) {
	if (!store[key]) {
		store[key] = { icon: toSvg(faName), defaultColor: BRAND_COLORS[key] || '#000000' }
		added++
	}
}

for (const [key, faName] of Object.entries(SOLID_ICONS)) {
	if (!store[key]) {
		store[key] = { icon: toSvg(faName, solid), defaultColor: BRAND_COLORS[key] || '#000000' }
		added++
	}
}

if (prune) {
	for (const key of Object.keys(store)) {
		if (!NEW_ICONS[key] && !SOLID_ICONS[key] && !KEEP.includes(key) && !BRAND_COLORS[key]) {
			delete store[key]
			removed++
		}
	}
}

for (const key of Object.keys(store)) {
	const colour = BRAND_COLORS[key]
	if (colour && store[key].defaultColor !== colour) {
		store[key].defaultColor = colour
		recoloured++
	}
}

const sorted = Object.fromEntries(Object.keys(store).sort().map((k) => [k, store[k]]))
fs.writeFileSync(STORE, JSON.stringify(sorted, null, 2) + '\n')

console.log(
	`iconStore.json: ${Object.keys(sorted).length} icons (${added} added, ${recoloured} recoloured, ${removed} removed) — Font Awesome ${FA_VERSION}`
)
