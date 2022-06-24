import React, { useEffect, useState, useRef } from "react";

function UserList(){
    const [data,setData]=useState([]);
    const getData=()=>{
        fetch('./data.json'
        ,{
            headers :{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        )
        .then(function(response){
            console.log(response)
            return response.json();
        })
        .then(function(myJson){
            console.log(myJson);
            setData(myJson)
        })
    }
    
    useEffect(()=>{
        getData()
    },[]);
    
    return (
        <div>
            <h2>Liste des Utilisateurs : </h2>
            {data && data.length > 0 && data.map((user)=>
            <div key={user.id}>nom : {user.name}, département : {user.departments}</div>
            )}
        </div>
    );

}

export default UserList;