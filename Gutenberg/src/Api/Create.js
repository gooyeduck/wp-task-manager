import React from "react";
import apiFetch from '@wordpress/api-fetch';

const Create = ( dataObject ) => {
    return apiFetch({
        path:'/tm/v1/tasks',
        method:'POST',
        data:dataObject
    });
}

export default Create;