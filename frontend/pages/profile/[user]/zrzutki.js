import React, {useContext, useState} from 'react'
import Router from 'next/router'
import Box from "../../../components/Box";

export default function TwojeZrzutki() {

    return (
        <>
            <div className="w-full pt-16">
                <Box className='w-2/3 mx-auto'>
                    <div className="sm:flex justify-between items-center mb-6">
                        <p className="text-primary text-2xl font-bold sm:mb-0 mb-4">Zrzutki</p>
                    </div>
                </Box>
            </div>
        </>
    )
}
