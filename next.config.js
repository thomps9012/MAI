module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: 'interview_select',
                permanent: true
            }
        ]
    }
}