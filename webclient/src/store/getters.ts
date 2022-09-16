import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
    dummy: () => string
};

export const getters: GetterTree<State, State> & Getters = {
    dummy: () => {
        return 'test'
    }
};