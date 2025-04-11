import Tabla from "../components/Tabla"

function Principal(){

    return(
        <>
            <div className=" flex flex-col flex-1 pt-[3vh] pl-[4vh] ">
                <div className="flex flex-row justify-between">
                    <h1 className="text-[22px] text-[#494949]">ORGANIZATIONS LISTING</h1>
                    <div className="flex flex-row mr-5 text-[18px] ">
                        <p className=""><h3>Admin/ </h3></p>
                        <h3 className="pl-1 text-[#494949]">Organizations List</h3>
                    </div>
                </div>
                <div  >
                    <Tabla></Tabla>
                </div>
            </div>
        
        </>
    )
}
export default Principal