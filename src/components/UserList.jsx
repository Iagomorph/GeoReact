import React, { useEffect, useState} from "react";



function UserList(){
    const [user,setUser]=useState([]);
    const [dpData, setDpData] = useState([]);
    const [foundUser, setFoundUser] = useState(user);
    console.log(dpData);
    
    const getDpData=()=>{
        fetch("https://geo.api.gouv.fr/departements")
    
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        setDpData(jsonData)
    })
}
    const getUser=()=>{
        fetch('./data.json'
        ,{
            headers :{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        )
        .then(function(response){
            return response.json();
        })
        .then(function(myJson){
            setUser(myJson);
            setFoundUser(myJson);
        })
    }
    useEffect(()=>{
            getUser();
            setFoundUser(user);
            getDpData();
    },[]);


    const filter = (e) =>{
        const dprtKey = e.target.value;
        //on récupère la valeur de l'option sélectionnée
        if (dprtKey !== ""){
            let results = [];
            //on filtre le tableau des départements de chaque usager
            user.filter((util)=>{
                util.departments.forEach(dpr => {
                    if(dpr == dprtKey){
                        results.push(util);
                    }
                return results;
                });
            });
            setFoundUser(results);
        }else{
            //si il n'y a pas d'option sélectionnée on affiche la liste complète
            setFoundUser(user);
        }
    }

    
    return (
        <div>
            <h2>Liste des Utilisateurs : </h2>
            {foundUser && foundUser.length > 0 ? (foundUser.map((user)=>
            <div key={user.id}>nom : {user.name}, département : {user.departments}</div>
            )) : (
            <h2>Aucun résultat</h2>
            )}
            <h2>Filtrer en fonction des départements</h2>
            <select defaultValue={""} onChange={filter}>
                <option value="" >Aucun</option>
                {dpData && dpData.length > 0 && dpData.map((dpr)=>
                <option key={dpr.code} value={dpr.code}>{dpr.nom} N° {dpr.code}</option>
                )}
            </select>
        </div>
    );

}

export default UserList;