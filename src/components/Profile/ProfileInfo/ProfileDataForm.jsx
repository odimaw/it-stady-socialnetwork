import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../../utils/validators/validators';
import { Input, Textarea } from '../../common/FormsControls/FormsControls';
import { Contact } from './ProfileInfo'
import s from './ProfileInfo.module.css'
import style from '../../common/FormsControls/FormsControls.module.css'

const ProfileDataForm = (props) => {
    return <form 
    onSubmit={props.handleSubmit}
    >
        <div><button>save</button></div>
        {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}
        <div>
            <b>Full name</b>: {<Field placeholder={'Full name'}
                                // validate={[required]}
                                 name={'fullName'} component={Input}
                                // type={'input'} 
                                />}
        </div>
        <div>
            <b>Looking for a job</b>: 
            {<Field placeholder={''}
                                // validate={[required]}
                                 name={'lookingForAJob'} component={Input}
                                type={'checkbox'} 
                                />}
        </div>
     
            <div>
                <b>My professional skills</b>: 
                {<Field placeholder={'My professional skills'}
                                // validate={[required]}
                                 name={'lookingForAJobDescription'} component={Textarea}
                              
                                />}
            </div>
        
        <div>
            <b>About me</b>: 
            {<Field placeholder={'About me'}
                                // validate={[required]}
                                 name={'aboutMe'} component={Textarea}
                              
                                />}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}:  {<Field placeholder={key}
                                // validate={[required]}
                                 name={'contacts.' + key} component={Input}
                                />}</b>
                </div>

                //  <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
            })}
        </div>
    </form>
}
const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm)
export default ProfileDataFormReduxForm;