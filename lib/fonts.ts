import localFont from 'next/font/local'

export const batikSans = localFont({
  src: '../public/fonts/batikfont.otf',
  variable: '--font-batik-sans',
  display: 'swap',
})

export const cabinetGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/CabinetGrotesk-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/CabinetGrotesk-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/CabinetGrotesk-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-cabinet-grotesk',
  display: 'swap',
})