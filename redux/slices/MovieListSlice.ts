import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Movie {
    id: number
    title: string
}

interface MovieListState {
    movieList: Movie[]
    movie: Object
    loading: boolean
    error: string | null
}

const initialState: MovieListState = {
    movieList: [],
    movie: {},
    loading: false,
    error: null
}

const movieListSlice = createSlice({
    name: 'movieList',
    initialState,
    reducers: {
        requestmovieListCollection(state) {
            state.loading = true
        },
        responsemovieListCollection(state, action: PayloadAction<Movie[]>) {
            state.movieList = action.payload
            state.loading = false
        },
        errormovieListCollection(state) {
            state.loading = false
            state.error = 'Error fetching movie list'
        },

        requestmovieAddEditCollection(state) {
            state.loading = true
        },
        responsemovieAddEditCollection(state, action: PayloadAction<Movie[]>) {
            state.loading = false
            state.movie = action.payload
        },
        errormovieAddEditCollection(state) {
            state.loading = false
            state.error = 'Error adding/editing movie'
        }
    }
})

export const {
    requestmovieListCollection,
    responsemovieListCollection,
    errormovieListCollection,
    requestmovieAddEditCollection,
    responsemovieAddEditCollection,
    errormovieAddEditCollection
} = movieListSlice.actions

export default movieListSlice.reducer
