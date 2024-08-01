import Swal, { SweetAlertOptions } from 'sweetalert2';
import './sweetalert.scss';

const errorIcon: string = `<svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                        <circle class="path circle" fill="none" stroke="#F96E66" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                        <line class="path line" fill="none" stroke="#F96E66" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
                        <line class="path line" fill="none" stroke="#F96E66" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2" />
                    </svg>`;
const successIcon: string = `<svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                        <circle class="path circle" stroke="" fill="#FF004F" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                        <polyline class="path check" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                    </svg>`;

interface IconType {
    success: string;
    error: string;
    [key: string]: string;
}

let icon: IconType = {
    success: successIcon,
    error: errorIcon
};

interface SweetAlertParams {
    message: string;
    type: 'success' | 'error';
}

const sweetalert = async ({ message, type }: SweetAlertParams): Promise<void> => {
    const options: SweetAlertOptions = {
        html: `<div class='custom-swal-modal'>
                    <div class='modal-body'>
                        ${icon[type]}
                        <h6>${message}</h6>
                    </div>
                </div>`,
        showConfirmButton: type === 'success' ? false : true,
        timer: type === 'success' ? 2000 : undefined,
        customClass: {
            confirmButton: 'custom-error-button' // Apply custom class to error button
        }
    };

    await Swal.fire(options);
}

export { sweetalert };
