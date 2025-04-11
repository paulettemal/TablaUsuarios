import { ChangeEvent, useEffect, useState } from "react";
import { OrgInt } from "../interfaces/Interfaz";
import { datos } from "../data/Data";
import Boton from "./Boton";
import Modal from "../modal/Modal";
import Formulario from "./Formulario";

function Tabla() {
    const [dato, setDato] = useState<OrgInt[]>([]);
    const [filtroOrg, setFiltroOrg] = useState("");
    const [selectedOrganization, setSelectedOrganization] = useState<OrgInt | null>(null);
    const [abrirModalFormulario, setAbrirModalFormulario] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (datos.organizaciones) {
            setDato(datos.organizaciones);
        }
    }, []);

    const guardaOrg = (e: ChangeEvent<HTMLInputElement>) => {
        setFiltroOrg(e.target.value);
        setCurrentPage(1);
    };

    const orgFiltradas = dato.filter(org =>
        org.organizacion.toLowerCase().includes(filtroOrg.toLowerCase())
    );

    const handleOpenAddUserModal = (organizacion: OrgInt) => {
        setSelectedOrganization(organizacion);
        setAbrirModalFormulario(true);
    };

    const cerrarModalFormulario = () => {
        setAbrirModalFormulario(false);
        setSelectedOrganization(null);
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = orgFiltradas.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(orgFiltradas.length / rowsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    return (
        <>
            <div className="rounded-md m-5 mx-10 mt-5 flex flex-col shadow-lg border-t-gray-700 ">
                <div className="flex flex-row justify-between p-5">
                    <h1 className="font-bold text-2xl ">Organizations</h1>
                    <div className="flex flex-row">
                        <img src="lupa.png" className="h-5 mt-0.5 -mr-8 z-10 "></img>
                        <input placeholder="Search an organization" className=" focus:outline-none bg-[#F0F0F0] rounded-[26px] pr-25 pl-12 " onChange={guardaOrg} ></input>
                    </div>
                </div>
                <div className="">
                    <table className="w-full">
                        <thead className="text-white bg-[#2A3042] text-center py-3 ">
                            <tr className="text-center py-5 text-[17px] ">
                                <th className=" ">Sr No</th>
                                <th>Organization</th>
                                <div className="py-3 ml-115">
                                    <th>Actions</th>
                                </div>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((d, index) => (
                                <tr key={d.id} className="border-b border-gray-200 text-center  " >
                                    <td>{indexOfFirstRow + index + 1} </td>
                                    <td>{d.organizacion} </td>
                                    <td className="flex flex-row gap-3  py-2 justify-end mr-20">
                                        <Boton text="Switch" imagen="switch.svg" onClick={() => console.log('Switch clicked for', d.organizacion)} ></Boton>
                                        <Boton text="Add user" imagen="user.png" onClick={() => handleOpenAddUserModal(d)}  ></Boton>
                                    </td>
                                </tr>
                            ))}
                            {orgFiltradas.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="text-center py-4">No organizations found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {orgFiltradas.length > 0 && (
                    <div className="flex justify-end items-center p-4">
                        <div className="flex items-center mr-4">
                            <span className="mr-2 text-gray-700 text-sm">Rows per page:</span>
                            <select value={rowsPerPage} onChange={handleChangeRowsPerPage} className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                        <span className="text-gray-700 text-sm">{indexOfFirstRow + 1}-{Math.min(indexOfLastRow, orgFiltradas.length)} of {orgFiltradas.length}</span>
                        <div className="ml-4">
                            <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-white border border-gray-300 rounded-md py-1 px-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none disabled:opacity-50" >
                                &lt;
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                <button key={number} onClick={() => paginate(number)} className={`border border-gray-300 rounded-md py-1 px-2 text-sm ${currentPage === number ? ' text-black' : 'bg-white text-gray-700 hover:bg-gray-100'} focus:outline-none`} >
                                    {number}
                                </button>
                            ))}
                            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-white border border-gray-300 rounded-md py-1 px-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none disabled:opacity-50" >&gt;
                            </button>
                        </div>
                    </div>
                )}

                <Modal open={abrirModalFormulario} cerrar={cerrarModalFormulario}>
                    <div>
                        {selectedOrganization && <Formulario selectedOrganization={selectedOrganization} cerrarModal={cerrarModalFormulario} />}
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default Tabla;