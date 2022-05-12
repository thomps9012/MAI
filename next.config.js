const withPWA = require('next-pwa')
const runtimecaching = require('next-pwa/cache')

module.exports = withPWA({
    pwa: {
        dest: 'public',
        runtimecaching
    }
})