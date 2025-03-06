import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';
interface PrivateRouteProps {
    element: React.ReactNode; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {

    const { user } = useUser(); 

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <>{element}</>;
};

export default PrivateRoute;