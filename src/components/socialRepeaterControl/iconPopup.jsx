/** @format */

// import { fontIcons } from '../../fontAwsomeIcon'
import fontIcons from '../../iconStore.json'

export function IconPopup(props) {

    const handelIconClickInPopUp = (e) => {
        
        const spanEle = e.target.closest('span')
        const iconId = spanEle.getAttribute('icon-id')
        props.setShowPopup([false, iconId])
        ////console.log(props.input);
        props.dataChangeHandle(iconId, props.input[1], props.index,props.input[2])
        // wp.customize.previewer.refresh();
    }
    return (
        <div className='gf-social-icons-selection-popup-wrapper'>
            <div className='gf-social-icons-selection-popup '>
                <p className='title'>Icons </p>
                <span className='gf-social-icons-cross-popup' onClick={props.hidePopup}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                        <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z' />
                    </svg>
                </span>
                <div className='gf-social-icons-list'>
                    {Object.keys(fontIcons).map((icon) => (
                        <span dangerouslySetInnerHTML={{ __html: fontIcons[icon].icon }} icon-id={icon} key={icon} className={`gf-social-icons-single-icon ${props.iconId && props.iconId === icon ? 'active' : ''}`} onClick={handelIconClickInPopUp}>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
