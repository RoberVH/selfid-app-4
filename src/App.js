import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { connect_wallet, disconnect_wallet } from './web3/connex';



function App() {
  const [injectedProvider, setInjectedProvider] = useState(null);
  const [address, setAddress] = useState(null);

  // this useEffect will provoke read addres in metamask thus triggering metamask prompt, TOCHECK: Portis and others wallets
  useEffect(()=>{
    const checkProvider = async () => {
      if (injectedProvider) {
       let cta =  await injectedProvider.listAccounts()
      console.log('cuenta:', cta, 'via:', injectedProvider.connection.url);
      setAddress(cta[0]);
     // console.log('injectedProvider vale:',injectedProvider)
      }
    }
    checkProvider()
    return (()=> {
      if (injectedProvider) {
        console.log('Descargando seEffect, voy a unsettear Conexion:')
        unsetConex()
      }
    })
  },
  [injectedProvider]);
  

  const setConex = async () => {
    console.log('setConex');
    const provider = await connect_wallet()
    if (provider) {
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
  
      // set listeners on web3Modal
      provider.on("chainChanged", chainId => {
        console.log(`chain changed to ${chainId}! updating providers`);
        setInjectedProvider(new ethers.providers.Web3Provider(provider));
      });
  
      provider.on("accountsChanged", () => {
        console.log(`account changed!`);
        setInjectedProvider(new ethers.providers.Web3Provider(provider));
      });
    
      // Subscribe to session disconnection
      provider.on("disconnect", async (code, reason) => {
        console.log(code, reason);
        await disconnect_wallet();
      })      
    }
  }

  const unsetConex = async  () => {
    console.log('unsetConex');
    await disconnect_wallet()
    //const provider = await connection();
    console.log('desconectado y provider es');
 }
 

  return (
    <div>
      <header className="App">
        <h1>Banco de Pruebas - Self.Id 4</h1>
        <div className='botones-header'>
          <button onClick={setConex}>Conexion</button>
          <button onClick={unsetConex}>Desconexion</button>
        </div>
      </header>
      <div className="App-body">
        <p> Datos de Conexion</p>
        <p> {address}</p>
        <p> chain</p>
      </div>
    </div>
  );
}

export default App;
