import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import  Head from 'next/head'
import Image from 'next/image'



export default function Example() {

  return (
    <>
      <Head>
        <title>NFT Shield</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="container mx-auto p-5"> 
      {/* justify-around py-4 w-full fixed top-0 left-0 right-0 z-10 backdrop-filter backdrop-blur-sm */}
      <div className="md:flex md:flex-row md:justify-between text-center text-sm sm:text-base justify-around py-4 px-24 md:px-16 backdrop-filter backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
          <div className="flex flex-row justify-center">
            <img
              src="/images/logo2.png"
              className="w-10 h-10 "
            />
            {/* <img src="../assets/logo2.png" className="w-10 h-10" /> */}

            <h1 className="text-3xl ml-2 mt-1 font-semibold">NFT Shield</h1>
          </div>
          <div className="text-3xl mt-2 space-x-10">
            <a
              href="#"
              className="text-2xl hover:text-[#F44E77] font-semibold p-4 px-3 sm:px-4"
            >
              Home
            </a>
            <a
              href="/verify"
              className="text-2xl hover:text-[#F44E77] font-semibold p-4 px-3 sm:px-4"
            >
              Verify NFT
            </a>
            <a
              href="./login"
              className="font-semibold text-2xl bg-[#CAC7FF] text-[#16194F] border-solid border-2 border-[#16194F] hover:bg-[#16194F] hover:text-[#CAC7FF] p-3 px-10 sm:px-5 rounded-full"
            >
              Login
            </a>
          </div>
        </div>

    <div className="md:flex md:flex-row mt-20">
      <div className="md:w-2/5 flex flex-col justify-center items-center">
        <h2 className="font-extrabold text-5xl mb-4 text-center md:self-start md:text-left">Redefining your warranty card experience!</h2>
        <p className="tracking-wide text-3xl text-center md:self-start md:text-left">Bringing the best out of warranty cards</p>
        <a href="./login" className="font-semibold bg-[#16194F] rounded-full py-4 px-8 text-gray-50 text-xl md:self-start my-5 border-[#16194F] border-solid border-2 hover:bg-[#CAC7FF] hover:text-[#16194F]">Try Now</a>
        {/* font-semibold bg-[#CAC7FF] text-[#16194F] border-solid border-2 border-[#16194F] hover:bg-[#16194F] hover:text-[#CAC7FF] p-3 px-10 sm:px-5 rounded-full */}
      </div>
      <div className="md:w-3/5">
        <img src="/images/combined.png" className="w-full" />
      </div>
    </div>

    <div className="my-20">
        <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 flex flex-col justify-center items-center">
                <h2 className="font-extrabold text-5xl mb-4 text-center md:self-start md:text-left">NFT Shield</h2>
                <p className="tracking-wide text-center md:self-start md:text-left text-3xl">A warranty card can now be given as a <b> smart digital token </b> on NFT Shield. This will enable warranty cards to be fraud-proof and publicly verifiable on-chain. Warranty Cards transition from being just a card for redeeming to an asset packed with utility.</p>
            </div>
            <div className="md:w-3/5 flex justify-center md:justify-end">
                <img src="/images/nft.png" className="" />
            </div>
        </div>
    </div>


    

    <div className="container my-24 px-6 mx-auto">

  {/* <!-- Section: Design Block --> */}
  <section className="mb-32 ">
    <div className="flex justify-center">
      <div className="text-center max-w-[700px]">
        <h2 className="text-3xl  mb-6 font-extrabold text-5xl">Why NFT Shield?</h2>
        <p className="mb-12 text-2xl">
          We have the best features tailored for specific events and below are some of our common ones!
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 xl:gap-x-12 text-2xl">
      <div className="mb-12">
        <div className="flex">
          <div className="shrink-0 mt-1">
            <svg className="w-4 h-4 text-[#F44E77]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
              </path>
            </svg>
          </div>
          <div className="grow ml-4">
            <p className="font-bold mb-1">A website which requires no blockchain knowledge to use the system.</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex">
          <div className="shrink-0 mt-1">
            <svg className="w-4 h-4 text-[#F44E77]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
              </path>
            </svg>
          </div>
          <div className="grow ml-4">
            <p className="font-bold mb-1">Generate NFT based warranty cards which cannot be duplicated</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex">
          <div className="shrink-0 mt-1">
            <svg className="w-4 h-4 text-[#F44E77]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
              </path>
            </svg>
          </div>
          <div className="grow ml-4">
            <p className="font-bold mb-1">Redeem warranty by using the webapp</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex">
          <div className="shrink-0 mt-1">
            <svg className="w-4 h-4 text-[#F44E77]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
              </path>
            </svg>
          </div>
          <div className="grow ml-4">
            <p className="font-bold mb-1">Once the warranty of the product is expired then the NFT is burned ie the trace of that NFT is no longer found</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex">
          <div className="shrink-0 mt-1">
            <svg className="w-4 h-4 text-[#F44E77]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
              </path>
            </svg>
          </div>
          <div className="grow ml-4">
            <p className="font-bold mb-1">The track of all the products listed by the admin is maintained properly</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex">
          <div className="shrink-0 mt-1">
            <svg className="w-4 h-4 text-[#F44E77]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
              </path>
            </svg>
          </div>
          <div className="grow ml-4">
            <p className="font-bold mb-1">The track of all the products bought by the customer is also maintained properly</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex">
          <div className="shrink-0 mt-1">
            <svg className="w-4 h-4 text-[#F44E77]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
              </path>
            </svg>
          </div>
          <div className="grow ml-4">
            <p className="font-bold mb-1">Also facilitates end to end payments using cryptocurrency</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex">
          <div className="shrink-0 mt-1">
            <svg className="w-4 h-4 text-[#F44E77]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
              </path>
            </svg>
          </div>
          <div className="grow ml-4">
            <p className="font-bold mb-1">Storing data in a decentralized manner</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* <!-- Section: Design Block --> */}

</div>
{/* <!-- Container for demo purpose --> */}


  

    
    
    <div className="border-t-2 border-gray-400 flex flex-col md:flex-row md:justify-between text-center py-5 text-sm">
      <div className="mb-4">
        <a href="#" className="text-2xl text-gray-500 mx-2.5">NFT Shield</a>
      </div>
      {/* <p>Developers: Krishi Chawda, Tanishka Borkar</p> */}
    </div>
  </div>
    </>
  ) 
}





























