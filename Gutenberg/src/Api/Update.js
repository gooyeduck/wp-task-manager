import apiFetch from '@wordpress/api-fetch';

const updateTask = (id, dataObject) => {
  return apiFetch({
    path: `/tm/v1/update-task/${id}`,
    method: 'POST',
    data: dataObject,
  });
};

export default updateTask;
