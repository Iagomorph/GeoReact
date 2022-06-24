import React,{ useEffect, useState } from "react";


function DepartementList(){
    
    const [dpData, setDpData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() =>{
        fetch("https://geo.api.gouv.fr/departements")
        .then((response)=> response.json())
        .then((jsonData)=>{
            setDpData(jsonData);
            setError(null);
        })
        .catch((err)=> {
            setError(err.message);
            setDpData(null);
        })
        .finally(() => {
            setLoading(false);
        });
    },[]);


return(
    <>
    <h2>Filtrer par départements</h2>
    {loading && <div>A moment please...</div>}
    {error && (
        <div>{`une erreur est survenue en récupérant les donées - ${error}`}</div>
    )}
    <select>
        {dpData && dpData.length > 0 && dpData.map((dpr)=>
        <option>{dpr.nom}</option>
        )}
    </select>
    </>
)
}

export default DepartementList();

