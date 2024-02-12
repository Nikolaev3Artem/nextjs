/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config")
const nextConfig = {
	i18n,
	reactStrictMode: false,
	swcMinify: true,
	poweredByHeader: false,
	env: {
		// REACT_APP_URL: "http://92.253.239.100:8001/",
		REACT_APP_URL: "https://ltbeck-2e4ce2725976.herokuapp.com/",
		// REACT_APP_URL: "http://127.0.0.1:8000/",
		TELEGRAM_BOT_TOKEN: "6050237511:AAHXIONxC14Kdyj1wx7tG7mVDQaKh0jWtwA",
		TELEGRAM_USER_ID: "202529298"
	},
	images: {
		domains: [
			"localhost",
			"127.0.0.1",
			"flagcdn.com",
			"192.168.31.15",
			"ltbeck-2e4ce2725976.herokuapp.com"
		]
	}
}

module.exports = nextConfig
