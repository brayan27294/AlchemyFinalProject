
export const handleResponse = async (action: any, state: any, res: any) => {
	return await res.json();
};

export const handleError = async (action: any, state: any, res: any) => {
	const error = await res.json();
	const message = error.message || (res.status === 404 && 'Item not found');
	return message || 'Something went wrong!';
};