import { ReactComponent as UserWomanLogged } from '../assets/icons/user-woman-logged.svg';

export default function UserLoggedComponent() {
    return (
        <div className="flex gap-4 items-center">
            <UserWomanLogged />
            <div className="flex flex-col">
                <p className="font-bold text-md text-white">Moni Roy</p>
                <span className="text-white text-sm">Admin</span>
            </div>
        </div>
    )
}