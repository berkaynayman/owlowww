"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Box, Button, Card, CardContent, InputAdornment, TextField, Typography } from "@/components/ui/mui"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import {passwordResetRequest} from "@/services/auth";
import {toast} from "sonner";

export default function PasswordResetWidget() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const { isDarkMode } = useTheme()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailError(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let hasError = false

    if (!email) {
      setEmailError(true)
      hasError = true
    }

    if (!hasError) {
        try {
            passwordResetRequest(email);
            toast.success("In Kürze erhalten Sie eine Mail mit weiteren Anweisungen");
        } catch (errorMsg) {
            toast.error(
                <div>
                    <h2 className="font-bold">Anforderung fehlgeschlagen</h2>
                    <p className="text-sm">{errorMsg}</p>
                </div>
            );
        }

    }
  }

  const translations = {
    de: {
      title: "Passwort zurücksetzen",
      subtitle: "Wir senden einen Link zum Zurücksetzen Ihres Passworts an Ihre E-Mail-Adresse.",
      email: "E-Mail",
      emailRequired: "E-Mail ist erforderlich",
      resetButton: "Passwort-Reset-Link senden",
      knowPassword: "Sie kennen Ihr Passwort?",
      login: "Anmelden",
      changeLanguage: "English",
    },
    en: {
      title: "Reset password",
      subtitle: "We will send a link to reset your password to your accounts e-mail address.",
      email: "Email",
      emailRequired: "Email is required",
      resetButton: "Send password reset link",
      knowPassword: "You know your password?",
      login: "Login",
      changeLanguage: "Deutsch",
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
      style={{ width: "16px", height: "16px", color: "white" }}
    >
      <path
        fill="currentColor"
        d="M0 96l576 0c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128H0zM64 405.3c0-29.5 23.9-53.3 53.3-53.3H234.7c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z"
      ></path>
    </svg>
  )

  const LoginIcon = () => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="arrow-right-to-bracket"
      className="svg-inline--fa fa-arrow-right-to-bracket"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{ width: "16px", height: "16px", color: "white" }}
    >
      <path
        fill="currentColor"
        d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"
      ></path>
    </svg>
  )

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
          padding: "24px",
          paddingLeft: { xs: "24px", sm: "56px" },
          paddingRight: { xs: "24px", sm: "56px" },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Image
                src="/images/logo-white.svg"
                alt="O&W Rechtsanwaltsgesellschaft mbH Logo"
                className={"my-5"}
                width={100}
                height={50}
                priority
            />
        </Box>

        <Typography variant="h4" component="h1" align="center" sx={{ mb: 2, fontWeight: "normal" }}>
          {t.title}
        </Typography>

        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          {t.subtitle}
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
                <InputAdornment position="end">
                  <IdCardIcon />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              sx: { color: "white" },
            }}
            FormHelperTextProps={{
              sx: { color: "rgba(255, 255, 255, 0.7)" },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 4,
              py: 1.5,
              backgroundColor: "white",
              color: "rgba(0, 0, 0, 0.8)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
            }}
          >
            {t.resetButton}
          </Button>
        </form>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
          <Typography component="span" sx={{ mr: 3 }}>
            {t.knowPassword}
          </Typography>
          <Link href="/" passHref>
            <Button
              variant="text"
              startIcon={<LoginIcon />}
              sx={{
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {t.login}
            </Button>
          </Link>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            onClick={toggleLanguage}
            startIcon={
              <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
                {language === "de" ? (
                  <Box component="img" src="/images/german-flag.svg" alt="German flag" sx={{ width: 24, height: 16 }} />
                ) : (
                  <Box
                    component="img"
                    src="/images/english-flag.svg"
                    alt="English flag"
                    sx={{ width: 24, height: 16 }}
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

