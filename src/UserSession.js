import { UserSession, AppConfig } from 'blockstack';
import { addressToString } from '@blockstack/stacks-transactions';
import { getStacksAccount } from 'Lib/account';
import { didConnect } from 'react-blockstack';
import { authOrigin } from 'Lib/constants';


export const appConfig = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data']),
});

// export const appConfig = new AppConfig(['store_write', 'publish_data']);
export const STX_JSON_PATH = 'stx.json';

function afterSTXAddressPublished() {
  console.log('STX address published');
  stxAddressSemaphore.putting = false;
}

const stxAddressSemaphore = { putting: false };
export function putStxAddress(userSession, address) {
  if (!stxAddressSemaphore.putting) {
    stxAddressSemaphore.putting = true;
    userSession
      .putFile(STX_JSON_PATH, JSON.stringify({ address }), {
        encrypt: false,
      })
      .then(() => afterSTXAddressPublished())
      .catch(r => {
        console.log(r);
        console.log('STX address NOT published, retrying');
        userSession.getFile(STX_JSON_PATH, { decrypt: false }).then(s => {
          console.log({ s });
          userSession
            .putFile(STX_JSON_PATH, JSON.stringify({ address }), {
              encrypt: false,
            })
            .then(() => afterSTXAddressPublished())
            .catch(r => {
              console.log('STX address NOT published');
              console.log(r);
              stxAddressSemaphore.putting = false;
            });
        });
      });
  }
}

export const finished = onDidConnect => ({ userSession }) => {
  didConnect({ userSession });
  onDidConnect({ userSession });
  console.log(userSession.loadUserData());

  const userData = userSession.loadUserData();
  const { address } = getStacksAccount(userData.appPrivateKey);
  console.log(JSON.stringify({ address: addressToString(address) }));
  putStxAddress(userSession, addressToString(address));
};

export const connectOptions = (onDidConnect) => {
  return {
    authOrigin: authOrigin,
    finished: finished(onDidConnect),
    appDetails: {
      name: 'Durran App',
      icon: window.location.origin + "/logo192.png",
    },
  };
};
