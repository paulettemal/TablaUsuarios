function Header(){
    return(
        <>
            <div className="bg-white h-[6vh] flex flex-row justify-between">
                <div className="pt-2 pl-5 ">
                    <img src="tres.svg" ></img>
                </div>
                <div className="flex flex-row h-7 ap-3 pt- mt-2 ">
                    <div className="flex flex-row mr-2 ">
                        <img src="icon.svg" ></img>
                        <h2 className="mt-0.5 ">Anne</h2>
                    </div>
                    
                    <img src="config.svg" className="h-5 mt-1 ml-2 mr-2" ></img>
                </div>
            </div>

        
        </>
    )
}
export default Header