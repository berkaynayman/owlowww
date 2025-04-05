"use client"

import type React from "react"
import {useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@/components/ui/mui"
import {useLanguage} from "@/contexts/language-context"
import LoadingSpinner from "./../loading-spinner"
import {useTheme} from "@/contexts/theme-context"
import {login} from "@/services/auth"
import { toast } from 'sonner';

export default function LoginWidget() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [message, setMessage] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [stayLoggedIn, setStayLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {language, toggleLanguage} = useLanguage()
    const {isDarkMode} = useTheme()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        setEmailError(false)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        setPasswordError(false)
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        let hasError = false

        if (!email) {
            setEmailError(true)
            hasError = true
        }

        if (!password) {
            setPasswordError(true)
            hasError = true
        }

        if (!hasError) {
            try {
                await login(email, password);
                window.location.href = '/dashboard'; // or use router.push if using next/router
            } catch (err: any) {
                const errorMsg = err.response?.data?.message || 'Zugangsdaten überprüfen';
                toast.error(
                    <div>
                        <h2 className="font-bold">Login fehlgeschlagen</h2>
                        <p className="text-sm">{errorMsg}</p>
                    </div>
                );            }
            // Show loading state
            //setIsLoading(true)

            // Simulate a network request
            /* setTimeout(() => {
                 // Redirect to dashboard page after successful login
                 window.location.href = "/dashboard"
             }, 1500) // Add a slight delay to show the loading effect
             */
        }
    }

    const translations = {
        de: {
            title: "Mandantenbereich",
            email: "E-Mail",
            emailRequired: "E-Mail ist erforderlich",
            password: "Passwort",
            passwordRequired: "Passwort ist erforderlich",
            stayLoggedIn: "Angemeldet bleiben",
            forgotPassword: "Passwort vergessen?",
            login: "Anmelden",
            changeLanguage: "English",
            loading: "Wird geladen...",
        },
        en: {
            title: "Protected Video Portal",
            email: "Email",
            emailRequired: "Email is required",
            password: "Password",
            passwordRequired: "Password is required",
            stayLoggedIn: "Stay logged in",
            forgotPassword: "Forgot password?",
            login: "Login",
            changeLanguage: "German",
            loading: "Loading...",
        },
    }

    const t = translations[language]

    // SVG icons as React components
    const IdCardIcon = () => (
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="id-card"
            className="svg-inline--fa fa-id-card"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            style={{width: "16px", height: "16px", color: "white"}}
        >
            <path
                fill="currentColor"
                d="M0 96l576 0c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128H0zM64 405.3c0-29.5 23.9-53.3 53.3-53.3H234.7c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z"
            ></path>
        </svg>
    )

    const EyeIcon = () => (
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="eye"
            className="svg-inline--fa fa-eye"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            style={{width: "16px", height: "16px", cursor: "pointer", color: "white"}}
        >
            <path
                fill="currentColor"
                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
            ></path>
        </svg>
    )

    if (isLoading) {
        return <LoadingSpinner message={t.loading}/>
    }

    return (
        <Card
            sx={{
                width: {xs: "calc(100% - 20px)", sm: "480px"},
                backgroundColor: "rgba(var(--ow-brand-primary), 0.75)",
                color: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                margin: {xs: "16px 10px 0", sm: "16px 0 0"},
                zIndex: 1,
                position: "relative",
                backdropFilter: "blur(12px)",
            }}
        >
            <CardContent
                sx={{
                    padding: {xs: "16px", sm: "24px"},
                    paddingLeft: {xs: "16px", sm: "56px"},
                    paddingRight: {xs: "16px", sm: "56px"},
                }}
            >
                <Box sx={{display: "flex", justifyContent: "center", mb: 3}}>
                    <Image
                        src="/images/logo-white.svg"
                        alt="O&W Rechtsanwaltsgesellschaft mbH Logo"
                        className={"my-5"}
                        width={100}
                        height={50}
                        priority
                    />
                </Box>

                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    sx={{
                        mb: 1,
                        fontWeight: "normal",
                        fontSize: {xs: "1.5rem", sm: "2rem"},
                    }}
                >
                    {t.title}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label={t.email}
                        variant="filled"
                        margin="normal"
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                        helperText={emailError ? t.emailRequired : ""}
                        InputProps={{
                            sx: {
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "8px",
                                color: "white",
                                borderColor: "white",
                                "& .MuiFilledInput-underline:before": {
                                    borderBottomColor: "white",
                                },
                                "& .MuiFilledInput-underline:after": {
                                    borderBottomColor: "white",
                                },
                                "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                                    borderBottomColor: "white",
                                },
                            },
                            endAdornment: (
                                <InputAdornment className={"mr-1"}
                                                position="end">
                                    <IdCardIcon/>
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{
                            sx: {color: "white"},
                        }}
                        FormHelperTextProps={{
                            sx: {color: "rgba(255, 255, 255, 0.7)"},
                        }}
                    />

                    <TextField
                        fullWidth
                        label={t.password}
                        variant="filled"
                        margin="normal"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        error={passwordError}
                        helperText={passwordError ? t.passwordRequired : ""}
                        InputProps={{
                            sx: {
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "4px",
                                color: "white",
                                borderColor: "white",
                                "& .MuiFilledInput-underline:before": {
                                    borderBottomColor: "white",
                                },
                                "& .MuiFilledInput-underline:after": {
                                    borderBottomColor: "white",
                                },
                                "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                                    borderBottomColor: "white",
                                },
                            },
                            endAdornment: (
                                <InputAdornment position="end" className={"mr-2"}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        edge="end"
                                        sx={{color: "white"}}
                                    >
                                        <EyeIcon/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{
                            sx: {color: "white"},
                        }}
                        FormHelperTextProps={{
                            sx: {color: "rgba(255, 255, 255, 0.7)"},
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: {xs: "column", sm: "row"},
                            justifyContent: "space-between",
                            alignItems: {xs: "flex-start", sm: "center"},
                            mt: 1,
                            mb: 2,
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={stayLoggedIn}
                                    onChange={(e) => setStayLoggedIn(e.target.checked)}
                                    sx={{
                                        color: "white",
                                        "&.Mui-checked": {color: "white"},
                                    }}
                                />
                            }
                            label={t.stayLoggedIn}
                            sx={{color: "white"}}
                        />

                        <Link href="/forgot-password" passHref style={{}}>
                            <Typography
                                component="span"
                                sx={{
                                    color: "white",
                                    textDecoration: "none",
                                    "&:hover": {textDecoration: "underline"},
                                    cursor: "pointer",
                                    mt: {xs: 1, sm: 0},
                                }}
                            >
                                {t.forgotPassword}
                            </Typography>
                        </Link>
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 2,
                            mb: 2,
                            py: 1.5,
                            backgroundColor: "white",
                            color: "rgba(0, 0, 0, 0.8)",
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                            },
                        }}
                    >
                        {t.login}
                    </Button>
                </form>

                <Box sx={{display: "flex", justifyContent: "center", mt: 2}}>
                    <Button
                        onClick={toggleLanguage}
                        startIcon={
                            <Box component="span" sx={{display: "flex", alignItems: "center"}}>
                                {language === "de" ? (
                                    <Box component="img" src="/images/english-flag.svg" alt="Switch to English"
                                         sx={{width: 24, height: 16}}/>
                                ) : (
                                    <Box
                                        component="img"
                                        src="/images/german-flag.svg"
                                        alt="Auf Deutsch wechseln"
                                        sx={{width: 24, height: 16}}
                                    />
                                )}
                            </Box>
                        }
                        sx={{
                            color: "white",
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.3)",
                            },
                            borderRadius: "4px",
                            px: 2,
                        }}
                    >
                        {t.changeLanguage}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

