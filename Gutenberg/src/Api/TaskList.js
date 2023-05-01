import apiFetch from '@wordpress/api-fetch';

const TaskList = () => {
    return apiFetch({
        path:'/tm/v1/tasks-list',
        method:'GET',
    });
}

export default TaskList;