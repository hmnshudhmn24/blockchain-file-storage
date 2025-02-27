
import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import FileStorageABI from "./FileStorage.json";

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

function App() {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    async function connectWallet() {
        if (window.ethereum) {
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = web3Provider.getSigner();
            const fileStorageContract = new ethers.Contract(CONTRACT_ADDRESS, FileStorageABI.abi, signer);
            setProvider(web3Provider);
            setContract(fileStorageContract);
            fetchFiles(fileStorageContract);
        } else {
            alert("Please install MetaMask!");
        }
    }

    async function fetchFiles(contract) {
        const userFiles = await contract.getFiles(await contract.signer.getAddress());
        setFiles(userFiles);
    }

    async function uploadFile() {
        if (!file) return;
        
        const formData = new FormData();
        formData.append("file", file);

        const { data } = await axios.post("http://localhost:5000/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        const tx = await contract.uploadFile(data.hash, data.name);
        await tx.wait();
        fetchFiles(contract);
    }

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Blockchain-Based File Storage</h1>
            <button onClick={connectWallet} className="bg-blue-500 text-white p-2 rounded">
                Connect Wallet
            </button>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mt-4" />
            <button onClick={uploadFile} className="bg-green-500 text-white p-2 rounded mt-2">
                Upload File
            </button>
            <ul className="mt-4">
                {files.map((file, index) => (
                    <li key={index} className="border p-2 rounded mb-2">
                        <a href={`https://ipfs.io/ipfs/${file.hash}`} target="_blank" rel="noopener noreferrer">
                            {file.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
