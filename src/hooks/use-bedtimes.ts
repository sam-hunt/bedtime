import { useContext } from 'react';
import { BedtimesContext, IBedtimesContext } from '../App/App';

export type IUseBedtimes = IBedtimesContext;
const useBedtimes = () => useContext(BedtimesContext);

export default useBedtimes;
