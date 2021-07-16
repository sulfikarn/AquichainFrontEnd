/* Class for getting all application texts in selected language */
class Language {

    /**
	 * getTexts returns JSON object with all application texts in selected language
	 *
	 * @param {String} lang - language in IETF format with ISO 3166-1 country code (eg. 'en-US')
	 * @return {Object} - all application texts in one JSON object
	 */
    static getTexts(lang) {
        if (!lang) {
            lang = navigator.language || navigator.userLanguage;
        }

        switch (lang) {
        case 'en-US':
            return Language.english;
        case 'cs-CZ':
            return Language.czech;
        default:
            return Language.english;
        }
    }
}

Language.english = {
    optionsTxt: 'Options',
    nodesTxt: 'Nodes',
    zonesTxt: 'Zones',
    modelsTxt: 'Models',
    closeControlsTxt: 'Close controls',
    openControlsTxt: 'Open controls',
    anchorsTxt: 'Anchors',
    tagsTxt: 'Tags',
    anchorsVisibleTxt: 'Anchors visible',
    tagsVisibleTxt: 'Tags visible',
    zonesVisibleTxt: 'Zones visible',
    statsVisibleTxt: 'Stats visible',
    recordsCountTxt: 'Trajectory points',
    northOffsetTxt: 'North offset',
    addressTxt: 'Address',
    aliasTxt: 'Alias',
    idTxt: 'Id',
    followTxt: 'Follow',
    modelTxt: 'Model',
    translateTxt: 'Translate',
    rotateTxt: 'Rotate',
    scaleTxt: 'Scale',
    labelScaleTxt: 'Label Scale',
    unfollowTxt: 'Unfollow',
    searchTxt: 'Filter',
    enable3dTxt: 'Vertical rotation',
    colorTxt: 'Color',
    editTxt: 'Edit',
    saveTxt: 'Save',
    importModelTxt: 'Import model',
    imuTxt: 'Sensor settings',
    inactiveTxt: 'Inactive visible',
    presenceTxt: 'Presence detection',
    removeTxt: 'Remove',
    cancelTxt: 'Cancel',
    assignTxt: 'Assign to current plan'
};

Language.czech = {
    optionsTxt: 'Nastavení',
    nodesTxt: 'Uzly',
    zonesTxt: 'Zóny',
    modelsTxt: 'Modely',
    closeControlsTxt: 'Zavřít ovládání',
    openControlsTxt: 'Otevřít ovládání',
    anchorsTxt: 'Kotvy',
    tagsTxt: 'Štítky',
    anchorsVisibleTxt: 'Kotvy viditelné',
    tagsVisibleTxt: 'Štítky viditelné',
    zonesVisibleTxt: 'Zóny viditelné',
    statsVisibleTxt: 'Statistiky viditelné',
    recordsCountTxt: 'Trajektorie',
    northOffsetTxt: 'Odsazení severu',
    addressTxt: 'Adresa',
    aliasTxt: 'Jméno',
    idTxt: 'Id',
    followTxt: 'Sledovat',
    modelTxt: 'Model',
    translateTxt: 'Posunout',
    rotateTxt: 'Otočit',
    scaleTxt: 'Změnit velikost',
    labelScaleTxt: 'Velikost popisků',
    unfollowTxt: 'Zrušit sledování',
    searchTxt: 'Hledat',
    enable3dTxt: '3D Rotace',
    colorTxt: 'Barva',
    editTxt: 'Editovat',
    saveTxt: 'Uložit',
    importModelTxt: 'Vložit model',
    imuTxt: 'Nastavení senzorů',
    inactiveTxt: 'Neaktivní viditelné',
    presenceTxt: 'Detekce přítomnosti',
    removeTxt: 'Odstranit',
    cancelTxt: 'Zrušit',
    assignTxt: 'Přiřadit k současnému plánu'
};