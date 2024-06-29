import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// create the props interface 
// set the loading state to accept a boolean value
interface RouteListenerProps {
  setLoading: (loading: boolean) => void;
}

// RouteListener function taking the routelistener props
// with a parameter setLoading boolean true or false
const RouteListener: React.FC<RouteListenerProps> = ({ setLoading }) => {

  // storing the location in a variable
  const location = useLocation();

  useEffect(() => {
    //setting setLoading to true 
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000); // Simulate loading time

    return () => clearTimeout(timeout);
  }, [location, setLoading]);

  return null;
};

export default RouteListener;
