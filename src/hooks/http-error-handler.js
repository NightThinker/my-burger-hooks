import { useState, useEffect } from 'react';

export default httpClient => {
	const [ error, setError ] = useState(null);

	const reqInterceptor = httpClient.interceptors.request.use(req => {
		setError(null);
		return req;
	});
	const resInterceptor = httpClient.interceptors.response.use(
		res => res,
		err => {
			setError(err);
		}
	);

	useEffect(
		() => {
			return () => {
				httpClient.interceptors.request.eject(reqInterceptor);
				httpClient.interceptors.response.eject(resInterceptor);
			};
		},
		[ reqInterceptor, resInterceptor ]
	);

	// componentWillMount () {
	//     this.reqInterceptor = axios.interceptors.request.use( req => {
	//         setError(null)
	//         return req;
	//     } );
	//     this.resInterceptor = axios.interceptors.response.use( res => res, error => {
	//         setError(error)
	//     } );
	// }

	// componentWillUnmount () {
	//     axios.interceptors.request.eject( this.reqInterceptor );
	//     axios.interceptors.response.eject( this.resInterceptor );
	// }

	const errorConfirmedHandler = () => {
		setError(null);
	};

	return [ error, errorConfirmedHandler ];
};
