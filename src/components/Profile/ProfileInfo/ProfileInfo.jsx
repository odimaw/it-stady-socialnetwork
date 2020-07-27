import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';


const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader />
    }

    return <div>

        <div>
            <img src='https://images.wallpaperscraft.ru/image/pliazh_palma_okean_127914_300x168.jpg'></img>
        </div>
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large}/>
            ava + description
    </div>

    </div>
}

export default ProfileInfo;