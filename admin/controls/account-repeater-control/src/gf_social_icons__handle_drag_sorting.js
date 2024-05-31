let gf_social_icons__handle_drag_sorting = function () {
    let gf_social_icons_account_list_container

    let gf_social_icons_account_draggable_Item

    let pointerStartX
    let pointerStartY

    let gf_social_icons_account_list_gap = 0

    let gf_social_icons_accounts = []

    let prevRect = {}

    function get_all_gf_social_icons_accounts() {
        if (!gf_social_icons_accounts?.length) {
            gf_social_icons_accounts = Array.from(gf_social_icons_account_list_container.querySelectorAll('.gf-social-icons-repeater-field-child-wrapper'))
        }
        return gf_social_icons_accounts
    }

    function gf_social_icons_accounts_get_Idle() {
        return get_all_gf_social_icons_accounts().filter((item) => item.classList.contains('gf-social-icons-is-idle'))
    }

    function isItemAbove(item) {
        return item.hasAttribute('data-is-above')
    }

    function isItemToggled(item) {
        return item.hasAttribute('data-is-toggled')
    }



    function gf_social_icons_accounts_dragging_setup() {
        gf_social_icons_account_list_container = document.querySelector('.gf-social-icons-repeater-field-wrapper')
        
        if (!gf_social_icons_account_list_container) return

        gf_social_icons_account_list_container.addEventListener('mousedown', gf_social_icons_accounts_dragging_start)
        gf_social_icons_account_list_container.addEventListener('touchstart', gf_social_icons_accounts_dragging_start)

        document.addEventListener('mouseup', gf_social_icons_accounts_dragging_end)
        document.addEventListener('touchend', gf_social_icons_accounts_dragging_end)
    }

    function gf_social_icons_accounts_dragging_start(e) {
        
        if (e.target.classList.contains('gf-social-icons-account-list-draging-handle')) {
            gf_social_icons_account_draggable_Item = e.target.closest('.gf-social-icons-repeater-field-child-wrapper')
        }

        if (!gf_social_icons_account_draggable_Item) return

        pointerStartX = e.clientX || e.touches?.[0]?.clientX
        pointerStartY = e.clientY || e.touches?.[0]?.clientY

        gf_social_icons_account_set_list_gap()
        gf_social_icons_accounts_disable_page_scroll()
        gf_social_icons_accounts_draggable_item()
        gf_social_icons_accounts_init_state()
        prevRect = gf_social_icons_account_draggable_Item.getBoundingClientRect()

        document.addEventListener('mousemove', drag)
        document.addEventListener('touchmove', drag, { passive: false })
        
    }

    function gf_social_icons_account_set_list_gap() {
        if (gf_social_icons_accounts_get_Idle().length <= 1) {
            gf_social_icons_account_list_gap = 0
            return
        }

        const item1 = gf_social_icons_accounts_get_Idle()[0]
        const item2 = gf_social_icons_accounts_get_Idle()[1]

        const item1Rect = item1.getBoundingClientRect()
        const item2Rect = item2.getBoundingClientRect()

        gf_social_icons_account_list_gap = Math.abs(item1Rect.bottom - item2Rect.top)
    }

    function gf_social_icons_accounts_disable_page_scroll() {
        document.body.style.overflow = 'hidden'
        document.body.style.touchAction = 'none'
        document.body.style.userSelect = 'none'
    }

    function gf_social_icons_accounts_init_state() {
        gf_social_icons_accounts_get_Idle().forEach((item, i) => {
            if (get_all_gf_social_icons_accounts().indexOf(gf_social_icons_account_draggable_Item) > i) {
                item.dataset.isAbove = ''
            }
        })
    }

    function gf_social_icons_accounts_draggable_item() {
        gf_social_icons_account_draggable_Item.classList.remove('gf-social-icons-is-idle')
        gf_social_icons_account_draggable_Item.classList.add('is-draggable')
    }

    function drag(e) {
        if (!gf_social_icons_account_draggable_Item) return

        e.preventDefault()

        const clientX = e.clientX || e.touches[0].clientX
        const clientY = e.clientY || e.touches[0].clientY

        const pointerOffsetX = clientX - pointerStartX
        const pointerOffsetY = clientY - pointerStartY

        gf_social_icons_account_draggable_Item.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`

        gf_social_icons_accounts_update_idle_state_and_position()
    }

    function gf_social_icons_accounts_update_idle_state_and_position() {
        const gf_social_icons_account_draggable_ItemRect = gf_social_icons_account_draggable_Item.getBoundingClientRect()
        const gf_social_icons_account_draggable_ItemY = gf_social_icons_account_draggable_ItemRect.top + gf_social_icons_account_draggable_ItemRect.height / 2

        // Update state
        gf_social_icons_accounts_get_Idle().forEach((item) => {
            const itemRect = item.getBoundingClientRect()
            const itemY = itemRect.top + itemRect.height / 2
            if (isItemAbove(item)) {
                if (gf_social_icons_account_draggable_ItemY <= itemY) {
                    item.dataset.isToggled = ''
                } else {
                    delete item.dataset.isToggled
                }
            } else {
                if (gf_social_icons_account_draggable_ItemY >= itemY) {
                    item.dataset.isToggled = ''
                } else {
                    delete item.dataset.isToggled
                }
            }
        })

        // Update position
        gf_social_icons_accounts_get_Idle().forEach((item) => {
            if (isItemToggled(item)) {
                const direction = isItemAbove(item) ? 1 : -1
                item.style.transform = `translateY(${direction * (gf_social_icons_account_draggable_ItemRect.height + gf_social_icons_account_list_gap)
                    }px)`
            } else {
                item.style.transform = ''
            }
        })
    }

    function gf_social_icons_accounts_dragging_end(e) {
        if (!gf_social_icons_account_draggable_Item) return

        apply_new_gf_social_icons_accounts_order(e)
        gf_social_icons_accounts_cleanup_dragging()
        gf_social_icons_publish_button_reactive();
    }

    function apply_new_gf_social_icons_accounts_order(e) {
        const gf_social_icons_accounts_reordered = []

        get_all_gf_social_icons_accounts().forEach((item, index) => {
            if (item === gf_social_icons_account_draggable_Item) {
                return
            }
            if (!isItemToggled(item)) {
                gf_social_icons_accounts_reordered[index] = item
                return
            }
            const newIndex = isItemAbove(item) ? index + 1 : index - 1
            gf_social_icons_accounts_reordered[newIndex] = item
        })

        for (let index = 0; index < get_all_gf_social_icons_accounts().length; index++) {
            const item = gf_social_icons_accounts_reordered[index]
            if (typeof item === 'undefined') {
                gf_social_icons_accounts_reordered[index] = gf_social_icons_account_draggable_Item
            }
        }

        gf_social_icons_accounts_reordered.forEach((item) => {
            gf_social_icons_account_list_container.appendChild(item)
        })

        gf_social_icons_account_draggable_Item.style.transform = ''

        requestAnimationFrame(() => {
            const rect = gf_social_icons_account_draggable_Item.getBoundingClientRect()
            const yDiff = prevRect.y - rect.y
            const currentPositionX = e.clientX || e.changedTouches?.[0]?.clientX
            const currentPositionY = e.clientY || e.changedTouches?.[0]?.clientY

            const pointerOffsetX = currentPositionX - pointerStartX
            const pointerOffsetY = currentPositionY - pointerStartY

            gf_social_icons_account_draggable_Item.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY + yDiff
                }px)`
            requestAnimationFrame(() => {
                gf_social_icons_account_draggable_Item_unset()
            })
        })
    }

    function gf_social_icons_accounts_cleanup_dragging() {
        gf_social_icons_account_list_gap = 0
        gf_social_icons_accounts = []
        gf_social_icons_account_state_unset()
        gf_social_icons_enable_page_scroll()

        document.removeEventListener('mousemove', drag)
        document.removeEventListener('touchmove', drag)
    }

    function gf_social_icons_account_draggable_Item_unset() {
        gf_social_icons_account_draggable_Item.style = null
        gf_social_icons_account_draggable_Item.classList.remove('is-draggable')
        gf_social_icons_account_draggable_Item.classList.add('gf-social-icons-is-idle')
        gf_social_icons_account_draggable_Item = null
    }

    function gf_social_icons_account_state_unset() {
        gf_social_icons_accounts_get_Idle().forEach((item, i) => {
            delete item.dataset.isAbove
            delete item.dataset.isToggled
            item.style.transform = ''
        })
    }

    function gf_social_icons_enable_page_scroll() {
        document.body.style.overflow = ''
        document.body.style.touchAction = ''
        document.body.style.userSelect = ''
    }
    gf_social_icons_accounts_dragging_setup()
}

