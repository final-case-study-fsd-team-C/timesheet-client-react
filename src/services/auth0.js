import auth0 from 'auth0-js';

class Auth {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            // the following three lines MUST be updated
            domain: 'fsdgroupc.auth0.com',
            audience: 'http://localhost:8081',
            clientID: 'QS5YN5Cxb8HwTdQZ4vusm6n1vMNG5KO2',
            redirectUri: 'http://localhost:3000/dash/dashboard',
            responseType: 'token id_token',
            scope: 'openid profile view:registration view:registrations'
        });

        this.getProfile = this.getProfile.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.signIn = this.signIn.bind(this);
        this.logout = this.logout.bind(this);
    }

    getProfile() {
        return this.profile;
    }

    getIdToken() {
        return this.idToken;
    }

    signIn() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) return reject(err);
                if (!authResult || !authResult.idToken) {
                    return reject(err);
                }
                this.idToken = authResult.idToken;
                this.profile = authResult.idTokenPayload;
                // set the time that the id token will expire at
                this.expiresAt = authResult.idTokenPayload.exp * 1000;
                this._getProfile(authResult);
                resolve();
            });
        })
    }

    _getProfile(authResult) {
        this.loggingIn = true;
        // Use access token to retrieve user's profile and set session
        this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
            if (profile) {
                this.setSession(authResult, profile);
            } else if (err) {
                console.warn(`Error retrieving profile: ${err.error}`);
            }
        });
    }

    setSession(authResult, prof) {
        // Set the time that the access token will expire at

        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        sessionStorage.setItem('access_token', authResult.accessToken);
        sessionStorage.setItem('id_token', authResult.idToken);
        sessionStorage.setItem('expires_at', expiresAt);
        sessionStorage.setItem('name', authResult.idTokenPayload.given_name);
        console.log(authResult.accessToken, authResult.idToken, expiresAt, prof)
    }

    logout() {
        // Remove tokens and expiry time from localStorage
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('id_token');
        sessionStorage.removeItem('expires_at');
        sessionStorage.removeItem('name');
        // Go back to the home route

    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(sessionStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}

const auth0Client = new Auth();

export default auth0Client;