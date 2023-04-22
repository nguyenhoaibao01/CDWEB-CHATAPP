import { AuthState } from 'providers/AuthProvider/slice';
import { GeneralState } from 'providers/GeneralProvider/slice';


export interface CombinedState {
  auth: AuthState;
  general: GeneralState;
}
