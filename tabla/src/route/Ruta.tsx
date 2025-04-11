import { Route, Routes } from "react-router-dom"
import App from "../App"
import Principal from "../pages/Principal"

function Ruta(){
    return(
        <>
            <Routes>
                <Route path='/' element={<App></App>} >
                    <Route path="/home" element={<Principal/>}></Route>
                </Route>
            </Routes>
        </>
    )
}
export default Ruta