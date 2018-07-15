import axios from 'axios';

const instance = axios.create({
  //baseURL: 'http://206.189.196.178:5000/',
  baseURL: 'http://flask-env.ibah63x2sj.us-east-2.elasticbeanstalk.com/',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
});

const getAllJobs = async () => await instance.get('jobs');
const getPendingJobs = async user_id => await instance.get(`jobs/pending_worker/1`);

export default {
  getAllJobs,
  getPendingJobs
};
