import { createContext } from 'react';
import { DataContextType } from '../type';

const DataContext = createContext({} as DataContextType);

export default DataContext;
