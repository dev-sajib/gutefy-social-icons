// import dependencies
import React from "react";
import { __ } from "@wordpress/i18n";

// import internal dependencies
import { fontIcons } from "../../fontAwsomeIcon";

export default function AccountGenerate({ accountsUrl, openInNewTab }) {
    const generateUrl = (value,accountType) => {
        switch (accountType) {
            case 'url':
                return value
                break;
            case 'mobilenumber' :
                return `tel:${value}`;
                break;
            case 'email':
                return `mailto:${value}`;
            default:
                return 'notvalid'
                break;
        }
    }
    console.log('✅',accountsUrl);
    return (
        <>
            {accountsUrl && accountsUrl.map((e, index) => (
                <a 
                    key={index} 
                    href={generateUrl(e[1],e[2])} 
                    className="gf_social_icons_social_icon" 
                    target={openInNewTab ? "_blank" : "_self"}
                    rel={openInNewTab ? "noopener noreferrer" : undefined}
                >
                    {fontIcons[e[0]].icon ? fontIcons[e[0]].icon : fontIcons[e[0]].icon}
                </a>
            ))}
        </>
    );
}
