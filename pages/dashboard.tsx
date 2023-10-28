import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db, storage } from "./firebase/firebase";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import Head from "next/head";
import Wallet from "./components/wallet";
import { getAuth, deleteUser } from "firebase/auth";
import { toast } from "react-toastify";
import { useEffectOnce } from "./hooks/useEffectOnce";
import { doc, updateDoc } from "firebase/firestore";

export default function dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uri_array, setUriArray] = useState<any>([]);
  const [final_Array, setFinal_Array] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);
  let tempStatus = "";
  let account = "";

  const auth = getAuth();

  useEffectOnce(() => {
    const fetchData = async () => {
      await checkIfWalletIsConnected();
      getData();
    };
    fetchData();
  });

  async function getData() {
    console.log(account);
    const warrantyCollectionRef = collection(db, "warranty");
    const q = query(
      warrantyCollectionRef,
      where("seller_address", "==", account)
    );
    const querySnapshot = await getDocs(q);

    await querySnapshot.forEach(async (doc) => {
      const sellerAddress = doc.data()["seller_address"];
      const formattedSellerAddress =
        sellerAddress.slice(0, 6) + "..." + sellerAddress.slice(-4);
      const buyerAddress = doc.data()["buyer_address"];
      const formattedBuyerAddress =
        buyerAddress.slice(0, 6) + "..." + buyerAddress.slice(-4);
      const date = new Date().getTime();
      console.log(date - doc.data()["time_created"]);
      const temp_min = parseInt(doc.data()["period"]);
      console.log(temp_min * 60000);

      if (date - doc.data()["time_created"] >= doc.data()["period"] * 60000) {
        console.log(date - doc.data()["time_created"]);
        tempStatus = "Expired";
      } else if (doc.data()["pending"] === true) {
        tempStatus = "Pending";
      } else {
        tempStatus = "Active";
      }

      final_Array.push({
        Id: doc.id,
        name: doc.data()["name"],
        status: tempStatus,
        description: doc.data()["description"],
        image: doc.data()["image"],
        price: doc.data()["price"],
        manufacturer: doc.data()["manufacturer"],
        timeCreated: doc.data()["timeCreated"],
        seller_address: formattedSellerAddress,
        buyer_address: formattedBuyerAddress,
        uri: doc.data()["uri"],
      });
      setFinal_Array(final_Array);
    });
    console.log(uri_array);
    console.log(final_Array);
    // for (let i = 0; i < final_Array.length; i++) {
    //   if (final_Array[i].status == "Expired") {
    //     const warrantyCollectionRef = collection(db, "warranty");
    //     const querySnapshot = await getDocs(warrantyCollectionRef);
    //     const docRef = doc(db, "warranty", final_Array[i].Id);
    //     await updateDoc(docRef, {
    //       expired: true,
    //     });
    //     tempStatus = "Expired";
    //   }
    // }
    // setFinal_Array(final_Array);
    setShow(true);
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        console.log("Make sure you have a metamask wallet!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      //checking whether we are authorized to access the user's wallet
      const accounts = await ethereum.request({ method: "eth_accounts" });
      //searching for authorized wallets
      if (accounts.length !== 0) {
        //if the user's wallet contains multiple accounts then choose the second one
        account = accounts[0];
        console.log("Found an authorized account: ", account);
      } else {
        console.log("No authorized account found");
      }
      //  }
    } catch (error) {
      console.log(error);
    }
  };

  async function changeStatus(id: any) {
    const warrantyCollectionRef = collection(db, "warranty");
    console.log(id);
    // const q = query(warrantyCollectionRef, where("name", "==", item.name));
    const querySnapshot = await getDocs(warrantyCollectionRef);
    // console.log(querySnapshot.docs[0].id);
    const docRef = doc(db, "warranty", id);
    await updateDoc(docRef, {
      pending: false,
    });
    for (let i = 0; i < final_Array.length; i++) {
      if (final_Array[i].Id == id) {
        final_Array[i].status == "Active";
      }
    }
    location.reload();
  }

  const [selectedStatus, setSelectedStatus] = useState("All");

  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  const filteredData =
    selectedStatus === "All"
      ? final_Array
      : final_Array.filter((item: any) => item.status === selectedStatus);

  return (
    <>
      <Head>
        <title>NFT Shield | Admin's Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-6 pt-6 pb-20 lg:px-8">
        <div>
          <nav
            className="flex h-12 items-center justify-between text-xl font-bold"
            aria-label="Global"
          >
            <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
              <h1 className="text-2xl">Admin</h1>
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
              <div className="pl-0 pr-0 grid grid-cols-3 gap-3">
                <div className="flex items-center">
                  <a href="/addProduct" className="">
                    Add Product
                  </a>
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
                      href="/listedProducts"
                      className="6-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                    >
                      Listed Products
                    </a>
                    <a
                      href="/addProduct"
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      Add Product
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

      <div className="flex flex-col text-2xl m-12">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 text-2xl">
          <label className="flex items-center py-3 px-6 text-left text-xl border rounded-lg">
            <p className="mr-3">Select warranty Status</p>
            <select
              className="border rounded-lg px-3 py-2 bg-gray-100 text-xl"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option className="text-xl" value="All">
                All
              </option>
              <option className="text-xl" value="Active">
                Active
              </option>
              <option className="text-xl" value="Pending">
                Pending
              </option>
              <option className="text-xl" value="Expired">
                Expired
              </option>
            </select>
          </label>

          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500 text-2xl">
              <tr>
                <th scope="col" className="px-6 py-4 text-2xl text-[#16194F]">
                  Seller
                </th>
                <th scope="col" className="px-6 py-4 text-2xl text-[#16194F]">
                  Buyer
                </th>
                <th scope="col" className="px-6 py-4 text-2xl text-[#16194F]">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-2xl text-[#16194F]">
                  Image
                </th>
                <th scope="col" className="px-6 py-4 text-2xl text-[#16194F]">
                  
                </th>
              </tr>
            </thead>
            <tbody>
              {show &&
                filteredData.map((e: any) => (
                  <tr className="border-b transition duration-300 ease-in-out hover:bg-[#BEBAFF]">
                    <td className="whitespace-nowrap px-6 py-4 text-xl text-[#16194F] font-semibold">
                      {e.seller_address}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-xl text-[#16194F] font-semibold">
                      {e.buyer_address}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-xl text-[#16194F] font-semibold">
                      {e.status}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-xl text-[#16194F] font-semibold">
                      <img
                        className="object-contain w-40 h-40"
                        src={e.image}
                      ></img>
                    </td>
                    {e.status == "Pending" && (
                      <td className="whitespace-nowrap px-6 py-4 text-xl text-[#16194F] font-semibold">
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={async (event) => {
                            try {
                              await changeStatus(e.Id);
                              // handle success
                            } catch (error) {
                              // handle error
                            }}}
                            >
                          Approve
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}