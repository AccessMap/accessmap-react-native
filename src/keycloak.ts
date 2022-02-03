import { RNKeycloak } from '@react-keycloak/native';

// Setup Keycloak instance as needed
// TODO: pass initialization options as required
const keycloak = new RNKeycloak({
  url: 'https://identity.opensidewalks.com/auth/',
  realm: 'accessmap',
  clientId: 'web',
});

export default keycloak;