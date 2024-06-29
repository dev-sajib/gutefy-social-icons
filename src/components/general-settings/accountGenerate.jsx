// import dependencies
import React from "react";
import { __ } from "@wordpress/i18n";

// import internal dependencies
import { fontIcons } from "../../fontAwsomeIcon";

export default function AccountGenerate({ accountsUrl, openInNewTab }) {
    return (
        <>
            {accountsUrl.map((e, index) => (
                <a 
                    key={index} 
                    href={e[1]} 
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
