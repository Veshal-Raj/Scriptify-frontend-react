// import { AxiosError } from 'axios';
// import toast from 'react-hot-toast';
// interface ErrorResponse {
//     message: string;
//     // Add other properties based on the structure of your JSON response
// }

// const errorHandle = (error: Error | AxiosError) => {
//     const axiosError = error as AxiosError;
//     if (axiosError.response?.data) {
//         const errorResponse = axiosError.response.data as ErrorResponse;
//         if (errorResponse.message) {
//             if (errorResponse.message === 'You are blocked by admin!') {
//                 localStorage.removeItem('uLoggedIn');
//                 location.href = '/login';
//                 toast.error(errorResponse.message);
//             } else if (errorResponse.message === 'Club have been blocked by admin!') {
//                 localStorage.removeItem('cLoggedIn');
//                 localStorage.removeItem('clubInfo');
//                 location.href = '/club/login';
//                 toast.error(errorResponse.message);
//             } else {
//                 toast.error(errorResponse.message);
//             }
//         } else {
//             console.log('Error response has no message');
//         }
//     } else {
//         toast.error('An error occurred. Please try again!');
//         console.log(axiosError.message);
//     }
// };

// export default errorHandle;
