'use strict'

const axios = require('axios');
const baseUrl = 'https://desktop-tmdjo97:3000';

class PointService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getPoints() {
    const response = await axios.get(this.baseUrl + '/api/points');
    return response.data;
  }

  async getPoint(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/points/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createPoint(newPoint) {
    const response = await axios.post(this.baseUrl + '/api/points', newPoint);
    return response.data;
  }

  async deleteAllPoints() {
    const response = await axios.delete(this.baseUrl + '/api/points');
    return response.data;
  }

  async deleteOnePoint(id) {
    const response = await axios.delete(this.baseUrl + '/api/points/' + id);
    return response.data;
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + '/api/users', newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async authenticate(user) {
    try {
      const response = await axios.post('/api/users/authenticate', user);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  
}

module.exports = PointService;