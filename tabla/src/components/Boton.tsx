interface BotonProps {
    text: string;
    imagen: string;
    onClick: () => void;
}

function Boton({text, imagen, onClick}: BotonProps){
    return(
        <>
            <div className="flex flex-row gap-2 bg-[#007BFF] py-1 px-3 rounded-2xl">
                <img src={imagen} className=" h-[18px] w-[18px] mt-0.5 " ></img>
                <button className="font-semibold text-white text-[14px]  " onClick={onClick}>
                    {text}
                </button>
            </div>
        </>
    )
}
export default Boton