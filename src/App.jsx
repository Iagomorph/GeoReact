// import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import UserList from "./components/UserList";
import DepartementList from "./components/DepartementList";

//Gère les chemins pour aller de pages en pages sans refresh
const App = () => {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    fetch("https://geo.api.gouv.fr/departements")
    .then((response) => response.json())
    .then((dataJson) => console.log(dataJson))
    .catch((err) => {
        console.log(err.message);
    })
}, []);

    return (
        <>
        <div>Hello</div>
        <UserList />
        <DepartementList />
        </>
        );
}


export default App;