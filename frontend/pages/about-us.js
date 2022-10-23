import React, { useContext } from 'react'

export default function AboutUs() {

    return (
        <>
            <div className="hero bg-base-200" style={{minHeight: "50vh"}}>
                <div className="hero-content flex-col lg:flex-row">
                    <img src="/about1.svg" className="max-w-sm rounded-lg mr-5" />
                    <div>
                        <h1 className="text-5xl font-bold">Nasz cel</h1>
                        <p className="py-6">Głównym celem naszej witryny jest pomoc w promowaniu wydarzeń użytkowników, udostępnianie ankiet o różnej tematyce oraz informowanie o nowinkach z kraju.</p>
                    </div>
                </div>
            </div>

            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src="/about2.svg" className="max-w-sm rounded-lg ml-5 mb-12" />
                    <div>
                        <h1 className="text-5xl font-bold">Zespół</h1>
                        <p className="py-6">Aenean eu justo non erat fringilla vulputate nec ac sapien. Curabitur non bibendum nibh, vel congue lorem. Nullam condimentum, nisi sit amet rhoncus pellentesque, orci massa vestibulum lacus, ut egestas nisl lacus sit amet est. Aliquam vestibulum ornare tortor a venenatis. Proin nec massa risus. Duis sollicitudin consectetur augue sit amet egestas. Sed convallis imperdiet finibus. Sed bibendum vel nisi sit amet tristique.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
