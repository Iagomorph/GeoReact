import { useEffect, useState, useRef } from "react";


function DepartementList(){
    const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    




return(
    <>
    <h2>Filtrer par départements</h2>
    <select>
        {data && data.length > 0 && data.map((dpr)=>
        <option>{dpr.nom}</option>
        )}
    </select>
    </>
)
}

export default DepartementList();

