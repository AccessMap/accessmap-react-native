import { RNKeycloak } from '@react-keycloak/native';

const keycloak = new RNKeycloak({
  url: 'https://identity.opensidewalks.com/auth/',
  realm: 'accessmap',
  clientId: 'accessmap-mobile',
});

export default keycloak;