// import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
// import { useState, useEffect } from "react";
import UserList from "./components/UserList";
// import Departements from "./components/Departements";


//Gère les chemins pour aller de pages en pages sans refresh
const App = () => {

//     const [dpData, setDpData] = useState([]);
    
//     const getDpData=()=>{
//         fetch("https://geo.api.gouv.fr/departements")
    
//     .then(function(response){
//         console.log(response)
//         return response.json();
//     })
//     .then(function(jsonData){
//         console.log(jsonData)
//         setDpData(jsonData)
//     })
// }

//     useEffect(()=>{
//         getDpData()
//     },[]);

    return (
        <>
        <UserList />
        </>
        );
}


export default App;