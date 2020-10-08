import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks.jsx';
import userPhoto from '../../../assets/images/user.png';


const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
           props.savePhoto(e.target.files[0]);
        }
    }
    let a = props.profile.photos.large;
debugger;
    return <div>
        <div className={s.descriptionBlock}>
            <img src={a || userPhoto} className={s.mainPhoto} />
            {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}></input>}
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
        </div>

    </div>
}

export default ProfileInfo;