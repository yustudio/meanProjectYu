module.exports = {
    'secretKey': '12345-67890-09876-54321',
    'mongoUrl' : 'mongodb://localhost:27017/conFusion',
    'facebook': {
        clientID: '513788212145350',
        clientSecret: 'c80310e4abe5adee49900b9d37a612a5',
        // URL for client application to receive the authorization code and 
        // access token after authorized by OAuth service provider
        callbackURL: 'https://localhost:3443/api/facebook/callback'
    }
}