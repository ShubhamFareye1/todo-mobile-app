import React from 'react'
import {
    saveUserObject,
  } from '../Database/realm';
export async function login(loginData) {
  return (
     await fetch(
       // 'http://172.16.33.228:8080/api/login?username=' +      // Fareye IP
       'http://192.168.1.57:8080/api/login?username=' +       // Hostel IP
       //  'http://10.0.2.2:8080/api/login?username=' +           // Amulator IP
          encodeURIComponent(loginData.email) +
          '&password=' +
          encodeURIComponent(loginData.password),
        {
          method: 'POST',
        },
      )
        .then(res => {
            console.log('api called res = ',res.status);
            return res.status;
        })
        .catch(error => {
          console.error('---------------------------------------------------------------------------',error);
        })
  )
}

export async function addUserDetail(userMail){
    return(
     //fetch('http://172.16.33.228:8080/todo/list')                          // FarEye IP - 172.16.33.228
     await fetch(`http://192.168.1.57:8080/user?username=${userMail}`)      // Hostel IP - 192.168.1.57
     .then(response => response.json())
     .then(async json => {
       console.log(json.data);
       saveUserObject(json);
     })
     .catch(error => {
       console.error(error);
     }));    
 }
