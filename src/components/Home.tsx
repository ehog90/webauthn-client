import { Fragment, FunctionComponent } from 'react';

import { useAppSelector } from '../redux/hooks';
import { selectUserData } from '../redux/user.slice';
import styles from './Home.module.scss';

interface IHomeProps {}

const Home: FunctionComponent<IHomeProps> = (props) => {
  const userData = useAppSelector(selectUserData);

  return (
    <Fragment>
      <h2 className='mb-2'>Home</h2>
      <h4>Welcome, {userData?.userName}!</h4>
      <div className={styles.content}>
        <h5>WebAuthn in a nutshell</h5>
        Web Authentication (WebAuthn) is a web standard published by the World
        Wide Web Consortium (W3C). WebAuthn is a core component of the FIDO2
        Project under the guidance of the FIDO Alliance. The goal of the project
        is to standardize an interface for authenticating users to web-based
        applications and services using public-key cryptography. On the client
        side, support for WebAuthn can be implemented in a variety of ways. The
        underlying cryptographic operations are performed by an authenticator,
        which is an abstract functional model that is mostly agnostic with
        respect to how the key material is managed. This makes it possible to
        implement support for WebAuthn purely in software, making use of a
        processor's trusted execution environment or a Trusted Platform Module
        (TPM). Sensitive cryptographic operations can also be offloaded to a
        roaming hardware authenticator that can in turn be accessed via USB,
        Bluetooth Low Energy, or near-field communications (NFC). A roaming
        hardware authenticator conforms to the FIDO Client to Authenticator
        Protocol (CTAP),[5] making WebAuthn effectively backward compatible with
        the FIDO Universal 2nd Factor (U2F) standard. Similar to legacy U2F, Web
        Authentication is resilient to verifier impersonation, that is, it is
        resistant to phishing attacks,[7] but unlike U2F, WebAuthn does not
        require a traditional password. Moreover, a roaming hardware
        authenticator is resistant to malware since the private key material is
        at no time accessible to software running on the host machine. The
        WebAuthn Level 1 and 2 standards were published as W3C Recommendations
        on 4 March 2019 and 8 April 2021 respectively. A Level 3 specification
        is currently a First Public Working Draft (FPWD).
      </div>
    </Fragment>
  );
};

export default Home;
