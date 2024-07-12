import React from "react";
import { useState, createRoot } from "@wordpress/element";
import "./../assets/css/socialRepeateater.scss";
import { SocialRepeatedField } from "./socialRepeatedField";
import AccountGenerate from "./accountGenerate";
import { ReactSortable } from "react-sortablejs";

const { customize } = wp;

export function SocialRepeateater(props) {
	const [accountsUrl, setAccountsUrl] = useState(props.control.setting.get()); // [['facebook', 'facebook.com'], ['google-x', 'google.com']]
	
	const addInputField = (e) => {
		e.preventDefault();
		// wp.customize.previewer.refresh()
		setAccountsUrl([...accountsUrl, ["facebook", "","url"]]);
	};

	const dataChangeHandle = (newAccountIconId, newAccountUrl, index,type) => {
		
		const newAccountData = [newAccountIconId, newAccountUrl,type];
		const newUrl = [...accountsUrl]; //[['facebook', 'facebook.com','url'], ['google-x', 'google.com','url']]
		newUrl[index] = newAccountData;
		setAccountsUrl(newUrl);
			props.control.setting.set(accountsUrl);

	};

	const removeInputField = (ele) => {
		
		const wrapperEle = ele.target.closest(
			".gf-social-icons-repeater-field-child-wrapper",
		);
		const accountId = wrapperEle.getAttribute("account-id");
		const currentAccountList = [...accountsUrl];
		currentAccountList.splice(accountId, 1);
		const newAccountList = currentAccountList;
		setAccountsUrl(newAccountList);
		props.control.setting.set(accountsUrl);
		//console.log('i am removed')

	};
	props.control.setting.set(accountsUrl);

	return (
		<div className="gutefy_settings_wrapper_accounts_social_icon gf-social-icons-repeater-field-wrapper">
			<button
				className="gf_social_icons_add_account_button"
				onClick={addInputField}
			>
				Add Input Field
			</button>
			<ReactSortable className="gf-social-icons-repeater-field-wrapper" list={accountsUrl} setList={setAccountsUrl}>
				{accountsUrl.map((input, index) => (
					<SocialRepeatedField
						input={input}
						index={index}
						key={index}
						dataChangeHandle={dataChangeHandle}
						removeInputField={removeInputField}
					/>
				))}
					</ReactSortable>
		</div>
	);
}
