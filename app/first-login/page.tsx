import PasswordResetWidget from "@/components/login/password-reset-widget"
import {LanguageProvider} from "@/contexts/language-context"
import {ThemeProvider} from "@/contexts/theme-context"
import FirstLoginWidget from "@/components/login/first-login-widget";

export default function FirstLoginPage() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <main
                    className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage:
                            'url("/images/login_background.jpg")',
                    }}
                >
                    <div className={"jss39"} style={{backgroundColor: "rgb(11,24,44, 0.2)"}}></div>
                    <FirstLoginWidget/>
                </main>
            </LanguageProvider>
        </ThemeProvider>
    )
}

