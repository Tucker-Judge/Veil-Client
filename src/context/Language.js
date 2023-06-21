
import { createContext, useState } from 'react'


export const LanguageContext = createContext({lang: 'English', setLang: () => {}})
export const LanguageProvider = ({children}) => {
    const [lang, setLang] = useState('English')
    return (
        <LanguageContext.Provider value={{ lang, setLang}}>
            {children}
        </LanguageContext.Provider>
    )
}
