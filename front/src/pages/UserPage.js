import React from 'react';
import BodyGridUser from '../components/BodyGridUser';
import HeaderUser from '../components/HeaderUser';



function UserPage({match}) {

    const userId = match.params.userId;



    return (
        <section className="user-container">
            <HeaderUser userId={userId} />
            <BodyGridUser userId={userId} />
        </section>
    );
}

export default UserPage;