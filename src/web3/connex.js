//import Web3 from "web3";
import Web3Modal from "web3modal"; 
import WalletConnectProvider from "@walletconnect/web3-provider";
import Portis from "@portis/web3";
import {ethers} from "ethers";

export let provider;
export let signer;


const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID, 
    }
  },
  portis: {
    package: Portis, // required
    options: {
      id: "PORTIS_ID" // required
    }
  }  
}

const web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  })


export const connect_wallet = async () => {
    console.log('To load Web3Modal (web3Modal.cachedProvider):[',web3Modal.cachedProvider,']')
    try {
    const provider = await web3Modal.connect();
    if (provider) {
      const provinstance = new ethers.providers.Web3Provider(provider);
      signer = provinstance.getSigner();
      console.log('instancia de provider:',provinstance)
      console.log('signer:',signer)
      return provider
    } 
    }catch (e){
      console.log('Error en connect_wallet:',e)
    }
}

export const disconnect_wallet = async () => {
  console.log('Por desconetar web3Modal.cachedProvider[', web3Modal.cachedProvider,']')
  await web3Modal.clearCachedProvider();
  console.log('Desconetado web3Modal.cachedProvider[', web3Modal.cachedProvider,']')
  // setTimeout(() => {
  //   window.location.reload();
  // }, 1);
};

