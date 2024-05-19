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

    function getIdlegf_social_icons_accounts() {
        return get_all_gf_social_icons_accounts().filter((item) => item.classList.contains('gf-social-icons-is-idle'))
    }

    function isItemAbove(item) {
        return item.hasAttribute('data-is-above')
    }

    function isItemToggled(item) {
        return item.hasAttribute('data-is-toggled')
    }



    function setup() {
        gf_social_icons_account_list_container = document.querySelector('.gf-social-icons-repeater-field-wrapper')
        
        if (!gf_social_icons_account_list_container) return

        gf_social_icons_account_list_container.addEventListener('mousedown', dragStart)
        gf_social_icons_account_list_container.addEventListener('touchstart', dragStart)

        document.addEventListener('mouseup', dragEnd)
        document.addEventListener('touchend', dragEnd)
    }

    function dragStart(e) {
        
        if (e.target.classList.contains('gf-social-icons-account-list-draging-handle')) {
            gf_social_icons_account_draggable_Item = e.target.closest('.gf-social-icons-repeater-field-child-wrapper')
        }

        if (!gf_social_icons_account_draggable_Item) return

        pointerStartX = e.clientX || e.touches?.[0]?.clientX
        pointerStartY = e.clientY || e.touches?.[0]?.clientY

        setgf_social_icons_account_list_gap()
        disablePageScroll()
        initgf_social_icons_account_draggable_Item()
        initgf_social_icons_accountsState()
        prevRect = gf_social_icons_account_draggable_Item.getBoundingClientRect()

        document.addEventListener('mousemove', drag)
        document.addEventListener('touchmove', drag, { passive: false })
        
    }

    function setgf_social_icons_account_list_gap() {
        if (getIdlegf_social_icons_accounts().length <= 1) {
            gf_social_icons_account_list_gap = 0
            return
        }

        const item1 = getIdlegf_social_icons_accounts()[0]
        const item2 = getIdlegf_social_icons_accounts()[1]

        const item1Rect = item1.getBoundingClientRect()
        const item2Rect = item2.getBoundingClientRect()

        gf_social_icons_account_list_gap = Math.abs(item1Rect.bottom - item2Rect.top)
    }

    function disablePageScroll() {
        document.body.style.overflow = 'hidden'
        document.body.style.touchAction = 'none'
        document.body.style.userSelect = 'none'
    }

    function initgf_social_icons_accountsState() {
        getIdlegf_social_icons_accounts().forEach((item, i) => {
            if (get_all_gf_social_icons_accounts().indexOf(gf_social_icons_account_draggable_Item) > i) {
                item.dataset.isAbove = ''
            }
        })
    }

    function initgf_social_icons_account_draggable_Item() {
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

        updateIdlegf_social_icons_accountsStateAndPosition()
    }

    function updateIdlegf_social_icons_accountsStateAndPosition() {
        const gf_social_icons_account_draggable_ItemRect = gf_social_icons_account_draggable_Item.getBoundingClientRect()
        const gf_social_icons_account_draggable_ItemY = gf_social_icons_account_draggable_ItemRect.top + gf_social_icons_account_draggable_ItemRect.height / 2

        // Update state
        getIdlegf_social_icons_accounts().forEach((item) => {
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
        getIdlegf_social_icons_accounts().forEach((item) => {
            if (isItemToggled(item)) {
                const direction = isItemAbove(item) ? 1 : -1
                item.style.transform = `translateY(${direction * (gf_social_icons_account_draggable_ItemRect.height + gf_social_icons_account_list_gap)
                    }px)`
            } else {
                item.style.transform = ''
            }
        })
    }

    function dragEnd(e) {
        if (!gf_social_icons_account_draggable_Item) return

        apply_new_gf_social_icons_accounts_order(e)
        cleanup()
        gfSocialIconsPublishButtonReactive();
        console.log('ami drag ses');
    }

    function apply_new_gf_social_icons_accounts_order(e) {
        const reorderedgf_social_icons_accounts = []

        get_all_gf_social_icons_accounts().forEach((item, index) => {
            if (item === gf_social_icons_account_draggable_Item) {
                return
            }
            if (!isItemToggled(item)) {
                reorderedgf_social_icons_accounts[index] = item
                return
            }
            const newIndex = isItemAbove(item) ? index + 1 : index - 1
            reorderedgf_social_icons_accounts[newIndex] = item
        })

        for (let index = 0; index < get_all_gf_social_icons_accounts().length; index++) {
            const item = reorderedgf_social_icons_accounts[index]
            if (typeof item === 'undefined') {
                reorderedgf_social_icons_accounts[index] = gf_social_icons_account_draggable_Item
            }
        }

        reorderedgf_social_icons_accounts.forEach((item) => {
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
                unsetgf_social_icons_account_draggable_Item()
            })
        })
    }

    function cleanup() {
        gf_social_icons_account_list_gap = 0
        gf_social_icons_accounts = []
        unsetgf_social_icons_accountstate()
        enablePageScroll()

        document.removeEventListener('mousemove', drag)
        document.removeEventListener('touchmove', drag)
    }

    function unsetgf_social_icons_account_draggable_Item() {
        gf_social_icons_account_draggable_Item.style = null
        gf_social_icons_account_draggable_Item.classList.remove('is-draggable')
        gf_social_icons_account_draggable_Item.classList.add('gf-social-icons-is-idle')
        gf_social_icons_account_draggable_Item = null
    }

    function unsetgf_social_icons_accountstate() {
        getIdlegf_social_icons_accounts().forEach((item, i) => {
            delete item.dataset.isAbove
            delete item.dataset.isToggled
            item.style.transform = ''
        })
    }

    function enablePageScroll() {
        document.body.style.overflow = ''
        document.body.style.touchAction = ''
        document.body.style.userSelect = ''
    }
    setup()
}

