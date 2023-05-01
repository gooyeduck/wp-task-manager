import apiFetch from '@wordpress/api-fetch';

const Delete = (taskId) => {
  return apiFetch({
    path: `/tm/v1/delete-task/${taskId}`,
    method: 'POST',
  });
};

export default Delete;
