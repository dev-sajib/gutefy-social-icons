import {
	Panel,
	PanelBody,
	Placeholder,
	__experimentalInputControl as InputControl,
	Spinner,
} from "@wordpress/components";
import { Fragment, Component,useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import { SocialRepeateater } from "./socialRepeateater";

// const { customize } = wp;

// const { api } = wp;
export  function GeneralSettings ({ control }){
	
	return (
		<Fragment>
			<div className="gf-social-icons__main-wrapper">
				<Panel>
					<PanelBody
						title={__("Control Your Accounts", "gf-social-icons")}
						icon="user"
					>
						{<SocialRepeateater control={control} />}
					</PanelBody>
				</Panel>
			</div>
		</Fragment>
	);
};
