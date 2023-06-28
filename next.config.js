const nextConfig  = {
     async redirects() {
    return [
      {
        source: '/',
        destination: '/characters',
        permanent: true,
      },
    ]
},
flags: {
    DEV_SSR: false,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
}

module.exports = nextConfig