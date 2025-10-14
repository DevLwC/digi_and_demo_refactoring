import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest: {
                name: 'Digi and Demo Application',
                short_name: 'DigiDemo',
                icons: [
                    {
                        src: 'android-launchericon-192-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'android-launchericon-192-192.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ],
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                start_url: '/',
                scope: '/'
            },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: ({ url }) => {
                            return url.origin === 'https://digi-and-demo-refactoring-aci.westeurope.azurecontainer.io';
                        },
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'api-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 // 1 hour
                            }
                        }
                    },
                    {
                        urlPattern: /\.(js|css|png|jpg|jpeg|svg|gif)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'assets-cache',
                            expiration: {
                                maxEntries: 60,
                                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                            }
                        }
                    }
                ]
            }
        })
    ],
    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-cert.pem')),
        },
        port: 5173,
    },
})
