import { Template } from 'meteor/templating';
import { TasksCollection } from "../api/TasksCollection";

import './Task.js';
import './Form.js';

import './MainContainer.html';

Template.mainContainer.helpers({
  tasks() {
    return TasksCollection.find({}, { sort: { createdAt: -1 } });
  },
});
