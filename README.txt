=== Sticky Social Icons ===
Contributors: gutefy
Tags: social icons, floating social icons, sticky icons, contact buttons, click to call
Requires at least: 6.3
Requires PHP: 7.2
Tested up to: 7.0
Stable tag: 1.3.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Floating or inline social and contact icons for any WordPress site — no code, live Customizer preview.

== Description ==

**Sticky Social Icons** is a lightweight, mobile-friendly social media plugin that lets you add floating sticky social icons to any WordPress site — without writing a single line of code. Visitors get instant access to your WhatsApp, phone, email, and every social channel right from the side of the screen.

Designed for businesses, creators, agencies, and stores, the plugin works out of the box with both block and classic themes, and with the common page builders.

Configure everything live in the **WordPress Customizer** — change colors, sizes, borders, radius, position, and per-device visibility and see the result update in real time.

= 🚀 Why Sticky Social Icons? =

* **No-code setup** — pick icons, paste URLs, publish. Live Customizer preview means no guessing.
* **Click-to-chat WhatsApp** — paste a number, optionally add a pre-filled message, done.
* **Click-to-call & SMS** — `tel:` and `sms:` links for mobile visitors.
* **Click-to-email** — `mailto:` with optional subject and body pre-fill.
* **Truly responsive** — show or hide on Desktop / Tablet / Mobile independently.
* **Hide on specific pages** — front page, blog, single posts, single pages, archives, search, 404, WooCommerce shop / cart / checkout / single product.
* **Hide for user roles** — keep icons away from logged-out guests, administrators, or any role you choose.
* **SEO and accessibility ready** — every link ships with proper `aria-label` and `rel="noopener noreferrer"`.
* **Brand colors in one click** — every channel drawn in its official color, or set your own per account.
* **Vertical rail, horizontal bar, or mobile bottom bar** — pick the shape that fits your site.
* **Collapse behind a button** — keep the screen clear until the visitor taps to open.
* **Show after scrolling** — reveal the icons once the visitor has scrolled, with an optional fade or slide.
* **Hover tooltips** — label any icon ("Chat on WhatsApp", "Call us") and the label doubles as the accessible name.
* **Any link, any icon** — add a custom link and upload your own icon for channels that are not in the pack.
* **Lightweight** — zero jQuery on the frontend, no bloated icon font, only the CSS your visitors actually need.

= 🎨 Full Design Control =

* Icon color (normal + hover, per device)
* Icon background color (normal + hover, per device)
* Icon size (normal + hover, per device)
* Icon wrapper / button size (per device)
* Border (4-side, color + style + width, per device)
* Border radius (normal + hover, per device — make pills, circles, squares)
* Vertical gap between icons
* Vertical position (top %)
* Horizontal position (left or right rail)
* Layout: vertical rail or horizontal bar
* Bottom bar on mobile, with iOS safe-area padding
* Per-account icon and background color
* Tooltip background and text color

= 📱 Popular Channels Built In =

44 icons ship with the plugin: Facebook, Facebook (f), Facebook Messenger, WhatsApp, Instagram, X (Twitter), YouTube, LinkedIn, TikTok, Telegram, Pinterest, Snapchat, Reddit, Skype, Threads, Bluesky, Mastodon, Signal, Viber, LINE, Discord, Slack, Spotify, Twitch, Vimeo, GitHub, Tumblr, Behance, Dribbble, Yelp, plus square variants, a generic link icon, Email (envelope) and Phone.

Need something else? Add a custom link and upload your own icon.

= 🛠 Source Code and Build Process =

Nothing in this plugin is obfuscated or minified by hand. The uncompiled source (JavaScript/JSX and SCSS) ships inside the plugin in `/src`, together with `package.json` and `webpack.config.js`, and is also published at https://github.com/syed-sajib/gutefy-social-icons

The files in `/build` are generated from `/src` with @wordpress/scripts (webpack) by running `npm install` and then `npm run build`. See the "Source Code" section below for details.

= 💼 Perfect For =

* Small business and local service websites
* Restaurants, salons, clinics, real estate, automotive
* WooCommerce stores wanting WhatsApp pre-sales chat
* Bloggers and content creators
* Portfolios and agency sites
* Membership and online course sites
* Anyone replacing heavyweight "share & follow" plugins

== Installation ==

= From the WordPress Dashboard =
1. Go to **Plugins → Add New**.
2. Search for **Sticky Social Icons**.
3. Click **Install Now** and then **Activate**.
4. Open **Appearance → Customize → Sticky Social Icons** and add your accounts.

= Manual Installation =
1. Download the plugin ZIP from WordPress.org.
2. Upload the `gf-social-icons` folder to `/wp-content/plugins/`.
3. Activate the plugin via **Plugins** in the WordPress dashboard.
4. Open **Appearance → Customize → Sticky Social Icons**.

== Frequently Asked Questions ==

= How do I add a WhatsApp click-to-chat icon? =
In the Customizer, pick the **WhatsApp** icon, paste your number with country code (digits only — e.g. `15551234567`), open the **Advanced** chevron next to the input, and optionally type a pre-filled message. The plugin builds a `https://wa.me/...` link automatically.

= How do I add a click-to-call (phone) icon? =
Pick the **Phone** icon, paste your number. The icon generates a `tel:` link, opening the dialer on mobile. Toggle "Use SMS instead of call" in the per-row Advanced panel to switch to an `sms:` link.

= Can I add an email icon with pre-filled subject and body? =
Yes. Pick the **Envelope** icon, paste the email address, open Advanced, and fill in Subject and Body. The plugin produces a `mailto:` link with the params encoded.

= How do I hide icons on specific pages? =
Open **Appearance → Customize → Sticky Social Icons → Advanced → Display Rules**. Check any page type (front page, single posts, WooCommerce checkout, etc.) to hide the icons there.

= How do I hide icons from logged-out visitors or administrators? =
In the same **Advanced** section, check any role under **Hide For These User Roles**. Use **Guest** for logged-out visitors.

= How do I show icons on mobile only (or hide on desktop)? =
Use **Device Visibility** in the Advanced section. Uncheck Desktop, Tablet, or Mobile independently.

= Does it work with WooCommerce? =
Yes. There are dedicated hide-on rules for the WooCommerce shop, cart, checkout, and single product pages.

= Does it work with block themes (Twenty Twenty-Four, etc.) and page builders (Elementor, Bricks, Divi)? =
Yes. The plugin injects on `wp_head`, `wp_footer`, or `wp_body_open` (whichever your theme provides). It is theme- and builder-agnostic.

= Does it slow down my site? =
No. There is no jQuery on the frontend, no icon font, and only the CSS your visitors need. SVG icons are inlined so the browser makes zero extra requests.

= Does it track my visitors? =
No. The plugin makes no external requests, sets no cookies, and does not track anything.

== Source Code ==

The complete, human-readable source of this plugin — uncompiled JavaScript/JSX and SCSS — is available at:

https://github.com/syed-sajib/gutefy-social-icons

The files in `/build` are generated from `/src` with @wordpress/scripts (webpack). To build them yourself:

1. `npm install`
2. `npm run build`

Build configuration lives in `webpack.config.js`; the entry points are `src/customizer.js` and `src/view.js`. Development watch mode is `npm run start`. The `/src` directory is also shipped inside this plugin package, so no download is required to read the original source.

The icon catalogue `src/iconStore.json` is generated by `npm run build:icons` (`tools/build-icon-store.js`), which is also included in the package.

Icon artwork comes from Font Awesome Free, licensed CC BY 4.0 — https://fontawesome.com/license/free

== Changelog ==

= 1.3.0 =
* **New:** Brand colors — one switch paints every channel in its official color, and each account can override the icon and background color individually.
* **New:** Layout choice — vertical rail or horizontal bar, plus a full-width bottom bar on mobile with iOS safe-area padding.
* **New:** Collapse behind a button — the icon list hides behind a single toggle, openable by click or keyboard and closed with Escape.
* **New:** Show after scrolling, with optional fade or slide entrance animation. Honours `prefers-reduced-motion`.
* **New:** Hover tooltips — give an account a label and it appears on hover and becomes the link's accessible name.
* **New:** Custom link and custom icon — add any URL and upload your own image from the media library.
* **New:** 16 more channels — Threads, Bluesky, Mastodon, Signal, Viber, LINE, Discord, Slack, Spotify, Twitch, Vimeo, GitHub, Tumblr, Behance, Dribbble, Yelp — bringing the pack to 44 icons.
* **Performance:** The frontend no longer loads React, wp-components, or the Customizer stylesheet — visitors now receive a single 1 KB script, loaded in the footer.
* **Performance:** The generated stylesheet is only rewritten when its contents actually change, instead of on every page view.
* **Fixed:** Unset hover values no longer emit invalid declarations such as `fill:!important;` into the generated stylesheet.
* **Fixed:** Empty responsive breakpoints no longer produce empty `@media` blocks.
* **Changed:** File writes now go through `WP_Filesystem`.
* **Changed:** Global constants are prefixed (`GF_SOCIAL_ICONS_DIR`, `GF_SOCIAL_ICONS_FILE`, `GF_SOCIAL_ICONS_URL`, `GF_SOCIAL_ICONS_BASENAME`) so they cannot collide with other plugins.

= 1.2.1 =
* **Changed:** Plugin display name simplified to **Sticky Social Icons** — removed the third-party trademarked term and the extra keywords from the name and the plugin tags.
* **Added:** Full uncompiled source (`/src`), `package.json`, and `webpack.config.js` are now included in the plugin package.
* **Added:** Readme now documents the public source repository and the exact build process for the files in `/build`.
* **Updated:** Repository URLs point to the new location, https://github.com/syed-sajib/gutefy-social-icons.
* No functional or feature changes.

= 1.2.0 =
* **New:** Border radius (normal + hover, responsive) — circle, pill, or rounded icons in one click.
* **New:** Smart per-row URL builder for WhatsApp (`wa.me` + pre-filled message), Email (`mailto:` with subject + body), Phone (`tel:` or `sms:`).
* **New:** Advanced visibility rules — hide on front page, blog, single post/page, archives, search, 404, and dedicated WooCommerce shop / cart / checkout / product targets.
* **New:** Hide icons for selected user roles (guest, administrator, subscriber, custom).
* **New:** Per-device on/off checkboxes (Desktop / Tablet / Mobile) — all visible at once, no more switching device tabs.
* **Accessibility:** Every icon link now ships with an `aria-label` and `rel="noopener noreferrer"`.
* **Refactor:** New reusable `Checkbox` Customizer control.
* **Improved:** Customizer UI — consistent capitalized labels, unified heading style, tidier spacing.
* **Improved:** Live Customizer preview now matches frontend rendering for all new style controls.

= 1.1.02 =
* Bug Fix: Fixed a bug related to style generation for better performance.

= 1.1.01 =
* Fixed: Icon Loading Issue in various themes.
* Added: Responsive Control.
* Bug Fix: Fixed a bug related to hover styles for better consistency.

= 1.1.0 =
* Added: Border Control.
* Added: Responsive Control.
* Bug Fix: Fixed a bug related to hover styles for better consistency.

= 1.0.1 =
* Enhancement: Improved the floating style of social icons for better stability.
* Enhancement: Enhanced functionality related to styling.
* Bug Fix: Fixed a bug related to hover styles.
* Added: Icon changing option.
* Introduced: Flexible account adding system.

= 1.0.0 =
* Initial release.

== Upgrade Notice ==

= 1.3.0 =
Adds brand colors, horizontal and mobile bottom-bar layouts, a collapsible toggle button, scroll reveal, tooltips, custom links and icons, and 16 new channels. Every new option is off by default, so your current setup looks exactly the same until you switch one on.

= 1.2.1 =
Maintenance release. Plugin name simplified, full source code and build instructions now included. No functional changes — safe update for everyone.

= 1.2.0 =
Major feature release. Adds click-to-chat WhatsApp/Email/Phone, page-level visibility rules, role-based hiding, border-radius, per-device visibility, and accessibility (aria-label, noopener). Recommended for everyone.
