import queryString from 'query-string';
import xhr from 'xhr';
import storage from '../lib/storage';

/**
 * Save a project JSON to the project server.
 * This should eventually live in scratch-www.
 * @param {number} projectId the ID of the project, null if a new project.
 * @param {object} vmState the JSON project representation.
 * @param {object} params the request params.
 * @property {?number} params.originalId the original project ID if a copy/remix.
 * @property {?boolean} params.isCopy a flag indicating if this save is creating a copy.
 * @property {?boolean} params.isRemix a flag indicating if this save is creating a remix.
 * @property {?string} params.title the title of the project.
 * @return {Promise} A promise that resolves when the network request resolves.
 */
export default function (projectId, vmState, params) {
    const opts = {
        body: vmState,
        // If we set json:true then the body is double-stringified, so don't
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    };

    const creatingProject = projectId === null || typeof projectId === 'undefined';
    const queryParams = {};
    if (Object.prototype.hasOwnProperty.call(params, 'originalId')) queryParams.original_id = params.originalId;
    if (Object.prototype.hasOwnProperty.call(params, 'isCopy')) queryParams.is_copy = params.isCopy;
    if (Object.prototype.hasOwnProperty.call(params, 'isRemix')) queryParams.is_remix = params.isRemix;
    if (Object.prototype.hasOwnProperty.call(params, 'title')) queryParams.title = params.title;
    if (creatingProject) {
        Object.assign(opts, {
            method: 'post',
            url: `${process.env.ZCAPIHOST}/scratch/projects?&token=${localStorage.getItem('token')}`
        });
    } else {
        Object.assign(opts, {
            method: 'put',
            url: `${process.env.ZCAPIHOST}/project/${projectId}/source?&token=${localStorage.getItem('token')}`
        });
    }
    return new Promise((resolve, reject) => {
        xhr(opts, (err, response) => {
            if (err) return reject(err);
            if (response.statusCode !== 200) return reject(response.statusCode);
            let body;
            try {
                // Since we didn't set json: true, we have to parse manually
                body = JSON.parse(response.body);
            } catch (e) {
                return reject(e);
            }
            body.id = projectId;
            if (creatingProject) {
                body.id = body['content-name'];
            }
            resolve(body);
        });
    });
}
