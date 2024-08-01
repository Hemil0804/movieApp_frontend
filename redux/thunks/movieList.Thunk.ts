import requestApi from '../../utils/request'; // Ensure requestApi has proper type definitions
import { sweetalert } from '../../common/common';
import {
    requestmovieListCollection,
    responsemovieListCollection,
    errormovieListCollection,
    requestmovieAddEditCollection,
    responsemovieAddEditCollection,
    errormovieAddEditCollection
} from '../slices/MovieListSlice';
import { Dispatch } from 'redux';

// Define specific types for payload and API responses
interface Payload {
    [key: string]: any;
}

interface Callback {
    (): void;
}

interface ApiResponse<T = any> {
    data: T; // Replace with actual data structure
    meta?: {
        message?: any;
    };
    statusCode?: number;
}

export const asyncMovieListCollection = (payload: Payload, callback: Callback) => async (dispatch: Dispatch) => {
    try {
        dispatch(requestmovieListCollection());
        const res: ApiResponse = await requestApi.post('/movie/list', payload);
        dispatch(responsemovieListCollection(res))
        if (typeof callback === 'function') {
            callback();
        }
    } catch (error) {
        // Handle specific error types if possible
        dispatch(errormovieListCollection());
        sweetalert({
            message: error?.message || 'An error occurred',
            type: 'error'
        });
    }
}

export const asyncAddEditCollection = (payload: Payload, callback: Callback) => async (dispatch: Dispatch) => {
    try {
        dispatch(requestmovieAddEditCollection());
        const res: ApiResponse = await requestApi.post('/collection/add-edit-collection', payload);
        dispatch(responsemovieAddEditCollection(res))
        sweetalert({
            message: res?.meta?.message || 'Success',
            type: 'success'
        });
        if (typeof callback === 'function' && res?.statusCode === 200) {
            callback();
        }
    } catch (error) {
        // Handle specific error types if possible
        dispatch(errormovieAddEditCollection());
        sweetalert({
            message: error?.message || 'An error occurred',
            type: 'error'
        });
    }
}
