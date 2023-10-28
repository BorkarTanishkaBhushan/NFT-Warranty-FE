import {
    useState,
} from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./utils/constants";
import { BigNumber } from "ethers";
import { db, storage } from "./firebase/firebase";
import { getDocs, collection, query, where } from "@firebase/firestore";
import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffectOnce } from "./hooks/useEffectOnce";
import Head from "next/head";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import Wallet from "./components/wallet";
import { Dialog } from "@headlessui/react";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { ImageList } from "@mui/material";
import { addDoc } from "firebase/firestore";


import Web3 from "web3";
import C2 from './utils/contract-abi.json'


const axios = require("axios");
const alchemyKey =
  "https://polygon-mumbai.g.alchemy.com/v2/3OGlmNKSI58c0xfNbKDSTGZYRUwv86Jm";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
//const [uri, setUri] = useState([])
const web3 = createAlchemyWeb3(alchemyKey);

export default function test() {
    const [data, setData] = useState<any>([]);
    const [showbtn, setShowbtn] = useState<boolean>(true);
    const [tokenId, setTokenId] = useState<any>([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const tokensCollectionRef = collection(db, "tokens");
    const [final, setFinal] = useState<any>([]);
    const [new_data, setNewData] = useState<any>([]);
    const [new_address, setNew_address] = useState<any>([]);
    const auth = getAuth();
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState<any>([]);
    const [image, setImage] = useState<any>([]);
    const [description, setDescription] = useState<any>([]);
    const [price, setPrice] = useState<any>([]);
    const [metadataArray, setMetadataArray] = useState<any>([]);
    const [imageList, setImageList] = useState<any>([]);
    const [finalArray, setFinalArray] = useState<any>([]);
    let new_list: (string | undefined)[] = [];


    //const omitMetadata = false;
    const main = async () => {
        const getMetadata = async () => {
            const querySnapshot = await getDocs(tokensCollectionRef);
            const imageListRef = ref(storage, "images/");
            querySnapshot.forEach((doc) => {
              metadataArray.push({
                name: doc.data()["name"],
                description: doc.data()["description"],
                image: doc.data()["image"],
                price: doc.data()["price"],
                manufacturer: doc.data()["manufacturer"],
                period: doc.data()["period"],
                uri: doc.data()["uri"],
                address: doc.data()["address"],
              });
            });
            await listAll(imageListRef).then((response) => {
              response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                  setImageList((prev: any) => [...prev, url]);
                });
              });
      
              console.log(imageList);
            });
          };
          await getMetadata();

    async function getData() {
        for (let i = 0; i < metadataArray.length; i++) {
          finalArray.push({
            Id: i,
            name: metadataArray[i].name,
            image: metadataArray[i].image,
            description: metadataArray[i].description,
            price: metadataArray[i].price,
            manufacturer: metadataArray[i].manufacturer,
            uri: metadataArray[i].uri,
            period: metadataArray[i].period,
            address: metadataArray[i].address,
          });
          //   console.log(finalArray);
        }
        setShowbtn(false);
      }

    await getData();
    };
    useEffectOnce(() => {
    main();
    });

    if (loading) {
        return (
            <>
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#F44E77] border-8 h-64 w-64"></div>
            <br />
            <p className="text-xl text-center text-[#16194f] font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Loading
            </p>
          </div>
            </>
            );
    }

    if (!user) {
    router.push("/");
    return <div> Please Sign in to Continue</div>;
    }

    const handleClick = async (
        Id: number,
      price: string,
      name: string,
      image: string,
      description: string,
      uri: string,
      address: string,
      period: string
        ) => {

            const querySnapshot = await getDocs(tokensCollectionRef);
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              new_data.push(doc.data()["uri"]);
              new_address.push(doc.data()["address"]);
              // console.log(doc.id, " => ", doc.data());
            });

        try{
            const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
            const contract = new web3.eth.Contract(C2.abi, CONTRACT_ADDRESS);
            const accounts = await web3.eth.getAccounts();
            // console.log(contract)
            // console.log(accounts)
            console.log("Going to pop wallet now to pay gas");
            console.log(price);
            

            const txHash1 = await web3.eth.sendTransaction({
                from: accounts[0],
                to: CONTRACT_ADDRESS,
                value: web3.utils.toWei('0.1','ether'),
                gas: 500000
            })
            console.log(txHash1)

            web3.eth.getBalance(CONTRACT_ADDRESS, function(error: any, result: any) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("after tx1 ", result);
                }
            })

            
            const new_period = parseInt(period);
            // let txHash2 = await contract.methods.transferBalance('0xD3e6F67cf34358D6035B40779CA63C53Fb752B49', new_period).send({ from: accounts[0] })
            // let txHash2 = await contract.methods.transferBalance('0xF7e2E1A7803cfce61877d254B94DB71F748a6c45').send({
            //     from: accounts[0]
            //   });
            let txHash2 = await contract.methods.transferBalance('0xD3e6F67cf34358D6035B40779CA63C53Fb752B49').send({ from: accounts[0] })
            console.log(txHash2)
            web3.eth.getBalance(CONTRACT_ADDRESS, function(error: any, result: any) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("after tx2 ", result);
                }
            })

            
            const txHash3 = await contract.methods.safeMint(accounts[0], new_data[Id]).send({ from: accounts[0] })
            console.log(txHash3)    

            const date_time = new Date().getTime();
            const issuedTicketsCollectionRef = collection(db, "issuedTickets");
            const docRef = await addDoc(warrantyCollectionRef, {
                name: name,
                description: description,
                image: image,
                price: price,
                tokenUri: uri,
                period: period,
                time_created: date_time,
                expired: false,
                pending: false,
                buyer_address: accounts[0],
                seller_address: address,
              });


            return{
                success: true,
                status:
                "Product Added Successfully" 
                // txHash1,
            }


        } catch(error: any) {
            console.log(error);
            return {
                success: false,
                status: "😥 Something went wrong: " + error.message,
            };
        }
    }

    return (
    <>
        <Head>
        <title>NFT Sheild | User</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="px-6 pt-6 pb-20 lg:px-8">

        <div>
            <nav
            className="flex h-9 items-center justify-between text-xl font-bold"
            aria-label="Global"
            >
            <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                <h1 className="text-2xl">User</h1>
            </div>
            <div className="flex lg:hidden">
                <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
                >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>

            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end bottom-0">
                <div className="pl-0 pr-0 grid grid-cols-3 gap-4">
                <div className="flex items-center">
                    <a href="/ownedProducts" className="">Owned Products</a>
                </div>
                <div className="flex items-center">
                    {" "}
                    <Wallet />{" "}
                </div>
                <div>
                    <button
                    onClick={() => auth.signOut()}
                    className="text-white text-xl font-bold bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5"
                    >
                    Sign Out
                    </button>
                </div>
                </div>
            </div>
            </nav>
            <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                <div className="flex h-9 items-center justify-between">
                <div className="flex">
                    <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    </a>
                </div>
                <div className="flex">
                    <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                    >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                </div>
                <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="py-6">
                    <a
                        href="/ownedProducts"
                        className="6-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                    >
                        Owned Products
                    </a>
                    <div>
                    <button
                    onClick={() => auth.signOut()}
                    className="text-white text-xl font-bold bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5"
                    >
                    Sign Out
                    </button>
                    </div>
                    <Wallet />
                    </div>
                </div>
                </div>
            </Dialog.Panel>
            </Dialog>
        </div>
        </div>
        

        <div className="flex min-h-screen flex-col py-2 pr-8 pl-8 ">
        <h1 className="text-4xl">
            {" "}
            <b>Browse Products:</b>
        </h1>
        <div className="grid grid-cols-4 gap-8 p-12">
          {!showbtn &&
            finalArray.map(
              (item: {
                Id: number;
                name: string;
                image: string;
                description: string;
                price: string;
                manufacturer: string;
                uri: string;
                period: string;
                address: string;
              }) => (
                <div key={item.Id} className="relative">
                  <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 h-full">
                    <img className="p-8 rounded-t-lg" src={item.image} />
                    <div className="px-5 pb-5">
                      <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {item.name}
                      </h5>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {item.description}
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {item.manufacturer}
                      </p>
                      <div className="px-5 pb-5"></div>
                      <div className="flex items-center justify-between">
                        <div className="space-x-5">
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            {item.price}
                            <div className="text-sm inline-block">eth</div>
                          </span>
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            {item.period}
                            <div className="text-sm inline-block">min</div>
                          </span>
                        </div>
                        <div className="absolute bottom-0 right-0 p-5">
                          {" "}
                            <button
                              onClick={() =>
                                handleClick(
                                  item.Id,
                                  item.price,
                                  item.name,
                                  item.image,
                                  item.description,
                                  item.uri,
                                  item.address,
                                  item.period
                                )
                              }
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                            >
                              Buy Now
                            </button>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
        </div>
    </>
    );
}