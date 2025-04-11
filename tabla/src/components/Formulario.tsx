import { useState } from 'react';
import Swal from 'sweetalert2';
import { OrgInt } from '../interfaces/Interfaz';

interface FormularioProps {
    selectedOrganization: OrgInt | null;
    cerrarModal: () => void;
}

function Formulario({ selectedOrganization, cerrarModal }: FormularioProps) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [grantPermission, setGrantPermission] = useState(false);
    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateFullName = (name: string): string => {
        if (!name.trim()) {
            return 'Full Name is required';
        }
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            return 'Full Name can only contain letters and spaces';
        }
        return '';
    };

    const validateEmail = (email: string): string => {
        if (!email.trim()) {
            return 'Email is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return 'Invalid email format';
        }
        return '';
    };

    const handleAddUser = () => {
        const fullNameValidation = validateFullName(fullName);
        const emailValidation = validateEmail(email);

        setFullNameError(fullNameValidation);
        setEmailError(emailValidation);

        if (fullNameValidation || emailValidation) {
            return;
        }

        if (!grantPermission) {
            Swal.fire({
                title: "Warning!",
                text: "Please grant permission to add the user.",
                icon: "warning"
            });
            return;
        }

        if (!selectedOrganization) {
            console.error("No organization selected.");
            return;
        }

        const { id: companyId, organizacion: companyName } = selectedOrganization;
        const newWorkerId = Math.random().toString(36).substring(7);

        const newUser = {
            id: newWorkerId,
            fullName: fullName,
            email: email,
        };

        const storageKey = `org_${companyId}_users`;
        const storedUsers = localStorage.getItem(storageKey);
        const existingUsers = storedUsers ? JSON.parse(storedUsers) : [];
        existingUsers.push(newUser);
        localStorage.setItem(storageKey, JSON.stringify(existingUsers));

        console.log(`Data saved for organization ${companyName} (ID: ${companyId}):`, existingUsers);

        Swal.fire({
            title: "Success",
            text: `Successfully a new user added to organization`,
            icon: "success"
        }).then(() => {
            cerrarModal();
        });

        setFullName('');
        setEmail('');
        setGrantPermission(false);
        setFullNameError('');
        setEmailError('');
    };

    return (
        <div className="flex flex-col p-6 gap-4 rounded-lg bg-white ">
            <h2 className="font-bold text-xl text-gray-800">Add new user</h2>
            <h3 className="font-light text-sm text-gray-500 pt-1">
                by adding a new user you are giving them permission to make changes.
            </h3>
            <label htmlFor="organization" className="text-blue-500 text-sm font-semibold">
                ORGANIZATION
            </label>
            <div className="relative">
                <input type="text" id="organization" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={selectedOrganization ? selectedOrganization.organizacion : ''} readOnly />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" fill="none"  viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <label htmlFor="fullName" className="text-blue-500 text-sm font-semibold">
                FULL NAME
            </label>
            <input type="text" id="fullName" className={`w-full border ${fullNameError ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`} placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            {fullNameError && <p className="text-red-500 text-xs italic">{fullNameError}</p>}
            <label htmlFor="email" className="text-blue-500 text-sm font-semibold">
                EMAIL
            </label>
            <input type="email" id="email" className={`w-full border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`} placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
            <div className="flex items-center">
                <input type="checkbox" id="permission" className="form-checkbox h-5 w-5 text-blue-500 border border-gray-300 rounded focus:ring-blue-500"  checked={grantPermission} onChange={(e) => setGrantPermission(e.target.checked)} />
                <label htmlFor="permission" className="ml-2 text-gray-700 text-sm">
                    I grant permission
                </label>
            </div>
            <button onClick={handleAddUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none rounded-3xl focus:shadow-outline" >
                Add User
            </button>
        </div>
    );
}

export default Formulario;