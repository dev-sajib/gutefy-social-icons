import { useState } from '@wordpress/element'
import './assets/css/socialRepeateater.scss';
import { SocialRepeatedField } from './socialRepeatedField';

const { customize } = wp;

export function SocialRepeateater(props) {
    const [accountsUrl, seturl] = useState(props.accountsUrl); // [['facebook', 'facebook.com'], ['google-x', 'google.com']]
    const addInputField = (e) => {
        e.preventDefault();
        seturl([...accountsUrl, ['facebook', '']]);
    }
    console.log('comming form SocialRepeateater 😓');

    const inputDataChangeHandle = (value,index) => {
        const newUrl = [...accountsUrl]; //[['facebook', 'facebook.com'], ['google-x', 'google.com']]
        newUrl[index][1] = value;
        seturl(newUrl);
    }
    const dataChangeHandle = (newAccountIconId,newAccountUrl,index) => {
        const newAccountData = [newAccountIconId,newAccountUrl];
        const newUrl = [...accountsUrl]; //[['facebook', 'facebook.com'], ['google-x', 'google.com']]
        newUrl[index] = newAccountData;
        seturl(newUrl);
    }
    
    const removeInputField = (ele) => {
        const wrapperEle = ele.target.closest('.gf-social-icons-repeater-field-child-wrapper')
        const accountId = wrapperEle.getAttribute('account-id');
        console.log(accountId);
        const currentAccountList =  [...accountsUrl]
        currentAccountList.splice(accountId,1);

        const newAccountList = currentAccountList
        seturl(newAccountList);

    }

    const iconDataChangeHandle=(iconId , index)=>{
        const newIcon = [...accountsUrl]; //[['facebook', 'facebook.com'], ['google-x', 'google.com']]
        newIcon[index][0] = iconId;
        seturl(newIcon);
    }
    console.log('🔥🔥🔥->' , accountsUrl); 
    customize.value('gf_social_icons_general_settings[accountsUrl]')(accountsUrl);

    return (
        <div className='gutefy_settings_wrapper_accounts_social_icon gf-social-icons-repeater-field-wrapper'>
            <button className='gf_social_icons_add_account_button' onClick={addInputField}>Add Input Field</button>
            <div className='gf-social-icons-repeater-field-wrapper'>
                {
                    accountsUrl.map((input, index) => (
                        <SocialRepeatedField 
                            input={input}
                            index={index}
                            key={index}
                            dataChangeHandle = {dataChangeHandle}
                            removeInputField = {removeInputField}
                        />
                    ))

                }
            </div>
        </div>

    )
}
