const LangSwitch = ({ lang, setLang, setShowMenu }) =>{
    const langChange = (e) =>{
        if(setShowMenu) { 
            if( lang !== e.target.value ){ setShowMenu(false); }
        }
        setLang(e.target.value);
    }  
    return(
        <div className="switch" >
            <select className="selectLang" onChange={langChange}> 
                <option selected={lang==="KO"?true:false} value="KO">KO</option>
                <option selected={lang==="EN"?true:false} value="EN">EN</option> 
            </select>
        </div>
    );
}
export default LangSwitch;