import React, { useEffect, useState} from "react";



function UserList(){
    const [user,setUser]=useState([]);
    const [dpData, setDpData] = useState([]);
    const [foundUser, setFoundUser] = useState(user);
    const [dpList, setDpList] = useState([]);



    const getDpData=()=>{
    //on récupère les données depuis l'api
    fetch("https://geo.api.gouv.fr/departements")
    
    .then(function(response){
        //on converti les données reçues au format json
        return response.json();
    })
    .then(function(jsonData){
        //on set le state de DpData avec les données
        setDpData(jsonData)
    })
}


    const getUser=()=>{
        //on récupère les données du json 
        fetch('./data.json'
        ,{
            headers :{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        )
        .then(function(response){
            // on retourne les données sous format json 
            return response.json();
        })
        .then(function(dataJson){
            //on set le User avec ces données, la liste de foundUser également (pour afficher la liste), et l'extarction de données pour le filtre
            setUser(dataJson);
            setFoundUser(dataJson);
        })
    }


    useEffect(()=>{
            getUser();
            getDpData();
            setFoundUser(user);
            dpDataToArray();
    },[]);


    useEffect(()=>{
        dpDataToArray()
    }, []);

    const dpDataToArray=()=> {
        //extrait les départements dans lesquels les utilisateurs peuvent se déplacer
        //puis extrait les infos de ces départements pour les passer en option du select
        let userDep = [];
        let userDepTab = [];
        let depList = [];
        //on extrait les tableaux de départements des données utilisateurs dans userDepTab
        user.forEach(user=>{
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
            setDpList(list => list = depList);
    }

    const filter = (e) =>{
        const dprtKey = e.target.value;
        //on récupère la valeur du département sélectionné
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
            //on affiche uniquements les utilisateurs qui peuvent se déplacer dans ce départements
            setFoundUser(results);
        }else{
            //si il n'y a pas d'option sélectionnée on affiche la liste complète
            setFoundUser(user);
        }
    }

    
    return (
        <div>
            <h2>Liste des Utilisateurs : </h2>
            <div className="Container">
            {foundUser && foundUser.length > 0 && (foundUser.map((user)=>
            <div key={user.id}>{user.name}</div>
            ))}
            </div>
            <h2>Filtrer en fonction des départements</h2>
            <div className="Container">
            <select defaultValue={""} onChange={filter} onClick={dpDataToArray}>
                <option value="" >Aucun</option>
                {dpList && dpList.length > 0 && dpList.map((dpr)=>
                <option key={dpr.code} value={dpr.code}>{dpr.nom} N° {dpr.code}</option>
                )}
            </select>
            </div>
        </div>
    );

}

export default UserList;

