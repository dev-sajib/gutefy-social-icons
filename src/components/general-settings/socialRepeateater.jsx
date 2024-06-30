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
		setAccountsUrl([...accountsUrl, ["facebook", ""]]);
	};
	const updatePreview = (accountsUrl) => {
		try {
			const iframeDoc = document.querySelector("iframe").contentDocument;
			const gfWrapperEle = iframeDoc.body.querySelector(
				"#gf_social_icons_wrapper",
			);

			if (gfWrapperEle) {
				gfWrapperEle.innerHTML = "";
				const gfWrapperEleRoot = createRoot(gfWrapperEle);
				gfWrapperEleRoot.render(
					<AccountGenerate accountsUrl={accountsUrl} />
				);
			}
		} catch (error) {}
	};

	const dataChangeHandle = (newAccountIconId, newAccountUrl, index) => {
		const newAccountData = [newAccountIconId, newAccountUrl];
		const newUrl = [...accountsUrl]; //[['facebook', 'facebook.com'], ['google-x', 'google.com']]
		newUrl[index] = newAccountData;
		setAccountsUrl(newUrl);
	};
	props.control.setting.set(accountsUrl);

	const removeInputField = (ele) => {
		const wrapperEle = ele.target.closest(
			".gf-social-icons-repeater-field-child-wrapper",
		);
		const accountId = wrapperEle.getAttribute("account-id");
		//console.log(accountId);
		const currentAccountList = [...accountsUrl];
		currentAccountList.splice(accountId, 1);

		const newAccountList = currentAccountList;
		setAccountsUrl(newAccountList);
	};

	const iconDataChangeHandle = (iconId, index) => {
		const newIcon = [...accountsUrl]; //[['facebook', 'facebook.com'], ['google-x', 'google.com']]
		newIcon[index][0] = iconId;
		setAccountsUrl(newIcon);
	};
	//console.log("🔥🔥🔥->", accountsUrl);
	updatePreview(accountsUrl);
	console.log('social',accountsUrl);

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
