import React, { useContext } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Context } from '../Context/AuthContext';
import { Users } from '../pages/Users'
import { Adduser } from '../pages/AddUser';
import { Viewuser } from '../pages/ViewUser';
import { EditUser } from '../pages/EditUser';
import { EditUserPassword } from '../pages/EditUserPassword';
import { ViewProfile } from '../pages/ViewProfile';
import { EditProfile } from '../pages/EditProfile';
import { EditProfilePassword } from '../pages/EditProfilePassword';
import { AddUserLogin } from '../pages/AddUserLogin';
import { RecoverPassword} from '../pages/RecoverPassword';
import { UpdatePassword } from '../pages/UpdatePassword';
import { EditProfileImage} from '../pages/EditProfileImage';
import { EditUserImage } from '../pages/EditUserImage';
import { Addticket } from '../pages/AddTicket';
import { ListTickets } from '../pages/ListTickets';
import { ViewTicket } from '../pages/ViewTicket';
import { ListNewTickets } from '../pages/ListNewTickets';
import { ListPgsTickets } from '../pages/ListPgsTickets';
import { ListEndTickets } from '../pages/ListEndTickets';

function CustomRoute({children, redirectTo}) {
    
    const {authenticated} = useContext(Context);

    return authenticated ? children: <Navigate to = {redirectTo}/>
}

export default function RoutesAdm() {
    return ( //Mudar as rotas
        <Routes> 
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element= {<CustomRoute redirectTo="/"><Dashboard/></CustomRoute>}/>
            <Route path="/users" element= {<CustomRoute redirectTo="/"><Users/></CustomRoute>}/>
            <Route path="/add-user" element= {<CustomRoute redirectTo="/"><Adduser/></CustomRoute>}/>
            <Route path="/view-user/:id" element= {<CustomRoute redirectTo="/"><Viewuser/></CustomRoute>}/>
            <Route path="/edit-user/:id" element= {<CustomRoute redirectTo="/"><EditUser/></CustomRoute>}/>
            <Route path="/edit-user-password/:id" element={<CustomRoute redirectTo="/"><EditUserPassword/></CustomRoute>}/>
            <Route path="/view-profile" element= {<CustomRoute redirectTo="/"><ViewProfile/></CustomRoute>}/>
            <Route path="/edit-profile" element= {<CustomRoute redirectTo="/"><EditProfile/></CustomRoute>}/>
            <Route path="/edit-profile-password" element= {<CustomRoute redirectTo="/"><EditProfilePassword/></CustomRoute>}/>
            <Route path="/add-user-login" element = {<AddUserLogin/>}/>
            <Route path="/recover-password" element = {<RecoverPassword/>}/>
            <Route path="/update-password/:key" element = {<UpdatePassword/>}/>
            <Route path="/edit-profile-image" element = {<CustomRoute redirectTo="/"><EditProfileImage/></CustomRoute>}/>
            <Route path="/edit-user-image/:id" element = {<CustomRoute redirectTo="/"><EditUserImage/></CustomRoute>}/>
            <Route path="/add-ticket" element= {<CustomRoute redirectTo="/"><Addticket/></CustomRoute>}/>
            <Route path="/list-tickets" element= {<CustomRoute redirectTo="/"><ListTickets/></CustomRoute>}/>
            <Route path="/view-ticket/:id" element= {<CustomRoute redirectTo="/"><ViewTicket/></CustomRoute>}/>
            <Route path="/list-new-tickets" element= {<CustomRoute redirectTo="/"><ListNewTickets/></CustomRoute>}/>
            <Route path="/list-pgs-tickets" element= {<CustomRoute redirectTo="/"><ListPgsTickets/></CustomRoute>}/>
            <Route path="/list-end-tickets" element= {<CustomRoute redirectTo="/"><ListEndTickets/></CustomRoute>}/>
        </Routes>
    );
};
