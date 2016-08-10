module.exports = {
    'jwtSecret': process.env.JWT_SECRET || 'MY_SECRET',
    'mongoUrl' : 'mongodb://localhost:27017/meanAppYu',
    'facebook': {
        clientID: '513788212145350',
        clientSecret: 'c80310e4abe5adee49900b9d37a612a5',
        // URL for client application to receive the authorization code and 
        // access token after authorized by OAuth service provider
        callbackURL: 'https://localhost:3443/api/facebook/callback'
    }
}