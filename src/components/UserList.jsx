import React, { useCallback, useEffect, useState} from "react";



function UserList(){
    const [user,setUser]=useState([]);
    const [dpData, setDpData] = useState([]);
    const [foundUser, setFoundUser] = useState(user);
    const [dpList, setDpList] = useState([]);
    //constante du tableau de départements des utilisateurs
    // const [userDep, setUserDep] = useState([]);
    // //constante du tableau des code des départements
    // const [depCode, setDepCode] = useState([]);

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
            dpDataToArray();
        })
    }


    useEffect(()=>{
            getUser();
            setFoundUser(user);
            getDpData();
            dpDataToArray();
    },[]);

    const dpDataToArray=()=> {
        //extrait les départements dans lesquels les utilisateurs peuvent se déplacer
        //puis extrait les infos de ces départements pour les passer en option du select
        let userDep = [];
        let userDepTab = [];
        let depList = [];
        //on extrait les tableaux de départements des données utilisateurs dans userDepTab
        user.forEach(user=>{
            console.log(user.departments)
            if(!userDepTab.includes(user.departments)){
                userDepTab.push(user.departments);
            }
        });
        //on extrait les départements uniques du nouveau tableau dans un userDep
        userDepTab.forEach(tab=>{
            for (let i = 0; i < tab.length; i++) {
                if(!userDep.includes(tab[i])){
                    userDep.push(tab[i]);
                }
            }
        });
        //on compare les codes de départements avec les départements extraits des utilisateurs
        //et on extrait les départements qui concorde dans depList
        dpData.forEach(dpr => {
            for (let i = 0; i < userDep.length; i++){
                if(userDep[i] == dpr.code){
                    depList.push(dpr);
                }
            }
            });
        //on défini le state de DpList avec les départements de depList
        setDpList(depList);
    }

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
                });
                return results;
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
                {dpList && dpList.length > 0 && dpList.map((dpr)=>
                <option key={dpr.code} value={dpr.code}>{dpr.nom} N° {dpr.code}</option>
                )}
            </select>
        </div>
    );

}

export default UserList;